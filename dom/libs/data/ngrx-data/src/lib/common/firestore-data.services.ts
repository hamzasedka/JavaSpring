import { HttpClient } from '@angular/common/http';
import {
  DefaultDataService,
  HttpUrlGenerator,
  QueryParams,
  EntityCollectionServiceElementsFactory,
  EntityActionOptions
} from '@ngrx/data';
import { Observable, of, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import {
  AngularFirestore,
  AngularFirestoreDocument,
  Action,
  DocumentSnapshot,
  DocumentChangeAction
} from '@angular/fire/firestore';
import { ENTITY_METADATA } from './entity-metadata';
import { Update } from '@ngrx/entity';
import { Entities } from './entities';
import { BaseCollectionService } from './base.services';
import { QueryPredicates } from './query-predicate';

export class FireBaseDataService<T> extends DefaultDataService<T> {
  private itemDoc: AngularFirestoreDocument<T>;
  constructor(
    entityName: string,
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private afs: AngularFirestore
  ) {
    super(entityName, http, httpUrlGenerator);
  }

  add(entity: T): Observable<T> {
    const uid = ENTITY_METADATA[this.entityName].selectId(entity);
    if (!!uid) {
      return this.updateEntity(entity);
    }
    const ref = this.afs.collection<T>(this.entityName).add(entity);
    return from(ref).pipe(
      switchMap(r =>
        this.getWithIdEntity(
          this.afs.doc<T>(`${this.entityName}/${r.id}`).snapshotChanges()
        )
      )
    );
  }

  delete(key: number | string): Observable<number | string> {
    this.itemDoc = this.afs.doc<T>(`${this.entityName}/${key}`);
    this.itemDoc.delete();
    return of(key);
  }

  getAll(): Observable<T[]> {
    return this.getWithIdEntities(
      this.afs.collection<T>(this.entityName).snapshotChanges()
    );
  }

  getById(key: number | string): Observable<T> {
    this.itemDoc = this.afs.doc<T>(`${this.entityName}/${key}`);
    return this.getWithIdEntity(this.itemDoc.snapshotChanges());
  }

  getWithQuery(queryParams: QueryParams | string): Observable<T[]> {
    return this.getWithIdEntities(
      this.afs
        .collection<T>(this.entityName, ref => {
          let query:
            | firebase.firestore.CollectionReference
            | firebase.firestore.Query = ref;
          const queryParamsList: QueryPredicates = JSON.parse(
            queryParams as string
          );
          for (const queryParam of queryParamsList) {
            query = query.where(
              queryParam.fieldPath,
              queryParam.opStr,
              queryParam.value
            );
          }
          return query;
        })
        .snapshotChanges()
    );
  }

  updateEntity(entity: T): Observable<T> {
    const uid = ENTITY_METADATA[this.entityName].selectId(entity);
    this.itemDoc = this.afs.doc<T>(`${this.entityName}/${uid}`);
    return from(this.itemDoc.set(entity, { merge: true })).pipe(
      switchMap(() => this.getWithIdEntity(this.itemDoc.snapshotChanges()))
    );
  }

  update(update: Update<T>): Observable<T> {
    const uid = update.id;
    return this.updateEntity({ uid, ...(update.changes as T) });
  }

  upsert(entity: T): Observable<T> {
    const uid = ENTITY_METADATA[this.entityName].selectId(entity);
    if (!uid) {
      this.add(entity);
    }
    return this.updateEntity(entity);
  }

  private getWithIdEntity(snapshot: Observable<Action<DocumentSnapshot<T>>>) {
    return snapshot.pipe(
      map(snapshotChange => {
        const v = snapshotChange.payload.data();
        return { uid: snapshotChange.payload.id, ...v };
      })
    );
  }

  private getWithIdEntities(snapshots: Observable<DocumentChangeAction<T>[]>) {
    return snapshots.pipe(
      map(snapshotChanges => {
        return snapshotChanges.map(snap => ({
          uid: snap.payload.doc.id,
          ...snap.payload.doc.data()
        }));
      })
    );
  }
}

export abstract class FireBaseCollectionService<
  T
> extends BaseCollectionService<T> {
  constructor(
    entityName: Entities,
    serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super(entityName, serviceElementsFactory);
  }

  getWithQueryPredicates(
    queryPredicates: QueryPredicates,
    options?: EntityActionOptions
  ): Observable<T[]> {
    return this.getWithQuery(
      { queryPredicates: queryPredicates.toString() },
      options
    );
  }
}
