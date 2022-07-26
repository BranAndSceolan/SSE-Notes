# SSE-Notes

This is a project for our Secure Software Engineering course.

It consists of a server and a client which make the writing and saving of private and public markdown notes possible.

## Current State Of The Project
[![CodeQL](https://github.com/BranAndSceolan/SSE-Notes/actions/workflows/codeql-analysis.yml/badge.svg?branch=development&event=pull_request)](https://github.com/BranAndSceolan/SSE-Notes/actions/workflows/codeql-analysis.yml)
[![backend tests](https://github.com/BranAndSceolan/SSE-Notes/actions/workflows/backend-test.yml/badge.svg?branch=development&event=pull_request)](https://github.com/BranAndSceolan/SSE-Notes/actions/workflows/backend-test.yml)
[![Dependency Review](https://github.com/BranAndSceolan/SSE-Notes/actions/workflows/dependency-review.yml/badge.svg?branch=development&event=pull_request)](https://github.com/BranAndSceolan/SSE-Notes/actions/workflows/dependency-review.yml)

## Building This Project

### Backend
* make sure all dependencies are installed ``npm install``
* either:

  * build and for development (first time):
    * create a .env file in the root directory with
      * NOTES_PASSWORD=choose_a_password
      * POSTGRES_USER=choose_an_admin_name
      * POSTGRES_PASSWORD=choose_an_admin_password
      * POSTGRES_DB=choose_a_db_name
      * NODE_ENV=debug
      * NOTES_USER=choose_a_username
    * Replace all choose_-entries with the values you would like to use.
    * source your .env file  ``source ../.env``
    * go into the backend directory ``cd backend``
    * execute the docker-compose file in the root directory using env-variables. ``env $(cat ../.env) docker-compose up``
    * start the server using nodemon (script should cause nodemon to use env-Variables): ``npm start``

  * replace old development build:
    * make all changes you would like to use for the .env file
    * take down current containers and volumes ``docker-compose down --volumes``
    * remove images to ensure the database is going to be recreated ``docker rmi postgres notes/postgres adminer``
    * create and start new containers and volumes: ``env $(cat ../.env) docker-compose up``
    * start the server using nodemon (script should cause nodemon to use env-Variables): ``npm start``

  * build and run deployment version locally (not in container)
    * if there is already a lib directory in root, remove it
    * build using ``npm run build``
    * the compiled code will be placed in a lib directory in the project root
    * copy into the lib directory
      * the package.json
      * the config folder with deployment.json AND default.json
    * either 
      - use another env file and change the start command in the package.json to use this new file
      - **or**
      - use the old env file (with the variable NODE_ENV now NODE_ENV=deployment and don't change the command in the package.json
    * enter the lib directory and install dependencies ``npm install``
    * 

## Tests
  * backend
    * chai
      * to run local chai tests, ensure you are using a development build like explained above
      * use ``npm run test`` instead of ``npm start`` to start your local tests
