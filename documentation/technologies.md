# Frontend
## vue 
Because it already escapes html input and attribute bindings. This is not a guarantee that there are going 
to be no injections, but helps.

## MD Editor v3
Markdown editor that also supports HTML-Tags and HTML Sanitization to prevent XSS

## Vuetify
Vue component library to speed up development

## Axios
Used to send requests to the backend

# Backend
## helmet
Sets HTTP headers automatically to help secure the application
## express
Because it is well known and tried, so if there are any issues, they are likely to be found and fixed quickly.
## express-session
To use cookies for session-handling. Also thought about using JWTs, but since you can't explicitly log out using those,
cookies might be the better choice.
Express-session is tried and intended to be used with express, so they should work good together. 
# typescript
to write better structured, typed code than we would get using plain javascript
# nodemon, ts-node, tsc-watch
to simplify development


# Database
## Postgres
Widely used SQL Database with very few known CVEs https://www.postgresql.org/support/security/14/