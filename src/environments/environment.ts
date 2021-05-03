// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,

    API_URL: 'http://localhost:4000/api',
    API_URL_MOCK_API: 'https://608be4779f42b20017c3d146.mockapi.io/api/v1',

    SIGN_UP: '/signup',
    LOG_IN: '/signin',
    CHECK_LOGIN: '/check',

    LIST_TODO: '/tasks',
    ADD_TODO: '/tasks',
    EDIT_TODO: '/tasks/:id',
    DELETE_TODO: '/tasks/:id',
    DETAIL_TODO: '/tasks/:id/lists',

    ADD_ITEM_DETAIL_TODO: '/tasks/:id/lists',
    EDIT_ITEM_DETAIL_TODO: '/tasks/:twoId/lists/:id',
    DELETE_ITEM_DETAIL_TODO: '/tasks/:twoId/lists/:id',

    LIST_DONE: '/done-tasks',
    ADD_DONE: '/done-tasks',
    EDIT_DONE: '/done-tasks/:id',
    DELETE_DONE: '/done-tasks/:id',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
