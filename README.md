# my-node-ts-api-seed

This is a seed to start creating node APIs with TypeScript, Jest, DDD and SOLID

## Setup

Don't forget to update the config files. To help you, here is a checklist that you can follow to starting building your API.

- [ ] Update `package.json` file with your project info
- [ ] Update `ormconfig.example.json` file with your database config and credentials
- [ ] Create an `ormconfig.json` file, this file is used to by the application to connect to database
- [ ] Update `.env.example` file with your environment variables
- [ ] Create a `.env` file, this file is used when running application to set the environment variables
- [ ] Install dependencies using `yarn`
- [ ] Run database migrations using `yarn typeorm migration:run`

And thats it, now you can run `yarn dev` and the development server will get up

## Technologies

The technologies used by this seed are:

### Runtime and Language

- NodeJS
- TypeScript

### Database and ORM

- mysql
- typeorm

### Routing and Validation

- express
- helmet
- cors
- express-async-errors
- celebrate

### Authentication and Hashing

- jsonwebtoken
- bcrypt

### Dependency Injection

- tsyringe

### Testing

- jest
- ts-jest

### Code Style

- eslint

### Build

- babel

### Commit Style and Git Hooks

- commitizen
- commitlint
- husky
