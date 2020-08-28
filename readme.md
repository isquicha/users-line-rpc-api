# Users Line RPC API

This API manages a Line (queue) of people. Allows user creation, adding a user to the Line, querying the Line, filtering users in the Line, querying a user's position in the Line and removing a user from the beginning of the Line. There is no persistence of data in files on the server (users and the Line are saved in volatile memory).

## Documentation
Docs can be found at [Postman Documenter](https://documenter.getpostman.com/view/12511871/TVCcWTzG).

## Dependencies 
Nodejs
Express
Yarn

## Installation
`yarn install`

## Run
Server `yarn run watch`
Tests `yarn run test`
