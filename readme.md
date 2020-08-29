# Users Line RPC API

## Description  
This API manages a Line (queue) of people.  
It allows user creation, adding a user to the Line, querying the Line, filtering users in the Line, querying a user's position in the Line and removing a user from the beginning of the Line.  
There is no persistence of data in files on the server (users and the Line are saved in volatile memory).  

## Documentation  
Docs can be found at [Postman Documenter](https://documenter.getpostman.com/view/12511871/TVCcWTzG).  

## Dependencies 
- [Node.js](https://nodejs.org/en/) (I used v12.16.3)
- [yarn](https://classic.yarnpkg.com/en/docs/install) (I used v1.12.4)

Project specific dependencies are on `package.json` and `package-lock.json`. See [installation](#Installation).

## Installation
Installation steps:
- Open the Terminal or CMD
- Git clone this repository (you will need [git client](https://git-scm.com/downloads) installed)
  - `git clone https://github.com/isquicha/users-line-rpc-api`
- Enter in downloaded folder (by default the flolder name is users-line-rpc-api)
  - `cd users-line-rpc-api`
- Run yarn install
  - `yarn install` or
  - `yarn`
- Run at least once the watch-ts script, to create the `/dist` directory with TypeScript transformed JavaScript files
  - `yarn run watch-ts`
- Exit watch-ts script
  - press `ctrl c`

## Usage
Run server  
`node /dist/server.js`

Run server in development mode  
`yarn run watch`  

Run tests  
`yarn run test`

## Authors
André Vicente
- [GitHub](https://github.com/isquicha) (Perfil in Portuguese)
- [LinkedIn](https://www.linkedin.com/in/isquicha) (Perfil in Portuguese and English)

## Motivations
This project was done as a challenge for an internship vacancy as a back-end developer.  

## Status
The project is under development, but without guarantees of new updates.  

## Todo
- [ ] Review English texts, such as test messages, documentation and API return messages (English is not my mother tongue, so there may be some mistakes).
- [ ] Remove or protect `/listUsers` endpoint.
- [ ] Separate tests in more than one file.
- [ ] Add multiple Line functionality.

## License
[MIT](./license)