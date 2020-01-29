// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://localhost:5000/v1',
  firebase: {
    apiKey: 'AIzaSyCYB2kcCluw9UiP_BzycDntKE1oAIIjqyM',
    authDomain: 'domiciliation-b2f4c.firebaseapp.com',
    databaseURL: 'https://domiciliation-b2f4c.firebaseio.com',
    projectId: 'domiciliation-b2f4c',
    storageBucket: 'domiciliation-b2f4c.appspot.com',
    messagingSenderId: '302953297351',
    appId: '1:302953297351:web:efdfcf90aec0689a6c95e2',
    measurementId: 'G-XNQ7DE3D72'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
