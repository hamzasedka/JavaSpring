import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as  Components from './components';
import { CompaniesStoreModule } from './store';
import { AppMaterialDesignModule, FloatBtnModule } from '@dom/ui/common'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { AppLayoutModule } from '@dom/ui/layout';
import { UiManageCompaniesRoutingModule } from './ui-manage-companies-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UiManageCompaniesRoutingModule,
    CompaniesStoreModule,
    AppMaterialDesignModule,
    FloatBtnModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    AppLayoutModule
  ],
  declarations: [Components.EditCompaniesComponent, Components.CompaniesComponent, Components.CompaniesMenuComponent, Components.CompaniesListComponent],
  exports: [Components.CompaniesComponent],
  entryComponents: [Components.EditCompaniesComponent]
})
export class UiManageCompaniesModule { }
