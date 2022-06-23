# Frontend
## vue
Because it already escapes html input and attribute bindings. This is not a guarantee that there are going
to be no injections, but helps.

# Backend
## helmet
To avoid secret information being read from the cache.
## express
Because it is well known and tried, so if there are any issues, they are likely to be found and fixed quickly.
## express-session
To use cookies for session-handling. Also thought about using JWTs, but since you can't explicitly log out using those,
cookies might be the better choice.
Express-session is tried and intended to be used with express, so they should work good together.

# Database
## postgres
## MD Editor v3
Markdown editor that also works for basic HTML-Tags