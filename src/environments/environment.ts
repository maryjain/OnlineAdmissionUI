// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// 10.162.14.145

export const environment = {
  production: false,
 // profileapiUrl: 'http://192.168.175.108/api/persons',
 // commonapiUrl:"http://192.168.175.108:81/api/"

 profileapiUrl: 'http://10.162.14.145/api/persons',
 commonapiUrl:"http://10.162.14.145:81/api/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
