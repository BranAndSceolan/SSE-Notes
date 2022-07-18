# SSE-Notes

This is a project for our Secure Software Engineering course.

It consists of a server and a client which make the writing and saving of private and public markdown notes possible.

## Current State Of The Project
[![CodeQL](https://github.com/BranAndSceolan/SSE-Notes/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/BranAndSceolan/SSE-Notes/actions/workflows/codeql-analysis.yml)

## Building This Project

### Backend
* go into the backend directory ``cd backend``
* make sure all dependencies are installed ``npm install``
* either:
  * build for development: 
    * create a .env file with
      * NOTES_PASSWORD=choose_a_password
      * POSTGRES_USER=choose_an_admin_name
      * POSTGRES_PASSWORD=choose_an_admin_password
      * POSTGRES_DB=choose_a_db_name
      * NODE_ENV=debug
      * NOTES_USER=choose_a_username
    * Replace all choose_-entries with the values you would like to use.
    * source your .env file  ``source <path to .env>``
    * execute the docker-compose file in the root directory. ``docker-compose build``
    * start the server using nodemon (script should cause nodemon to use env-Variables): ``npm start``