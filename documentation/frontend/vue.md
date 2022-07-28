# Project structure and style guide

* Every component is written in TypeScript, use typings whenever it is possible.

* Every page in the Vue router (``src/router/index.ts``) has an appropriate view in the ``views`` directory, these views should contain minimal, preferably no CSS or TypeScript and should just load a component.

* Functionality used throughout the entire application should be written as ``services`` following the singleton design pattern. E.g. a service to make API requests or to handle state management.

* Custom types should be declared in ``src/libraries/Types.ts`` for consistency across components.

* Elements that need to be visible on every page are in ``src/App.vue``, e.g. the navbar or the snackbar displaying error messages.

# Packages used

## [Vuetify](https://next.vuetifyjs.com/en/)

Vuetify is an open-source UI component library, it's included to speed up development.

License: MIT

## [md-editor-v3](https://github.com/imzbf/md-editor-v3)

md-editor-v3 is an open source markdown editor and can to display markdown content. It also supports the use of an HTML sanitizer.
To display HTML content it sets the .innerHTML attribute, any markdown file it's supposed to display <b>has to be filtered</b>.
The backend has to sanitize HTML and URLs in a-tags for this reason, otherwise it would be possible for users to write notes containing scripts or stylesheets that get loaded and executed as such.

License: MIT

## [sanitize-html](https://github.com/apostrophecms/sanitize-html)

sanitize-html is open source, very comprehensive and covers a lot of ways an attacker could use HTML content to harm users of the application.
Generally a client is not to be trusted with this, the backend also uses this library on created notes, it's used here to ensure the preview of the markdown editor is accurate and matches the saved note.

License: MIT

## [axios](https://github.com/axios/axios)

Axios is an open source library used to make http and XMLHttp requests. It supports client side protections against cross-site request forgery.

License: MIT