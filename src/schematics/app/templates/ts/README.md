## Installation

```bash
yarn
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Migration

```bash
# generate migration
$ yarn migrate:generate

# create new migration
$ yarn migrate:create

# run migration
$ yarn migrate:up

# revert migration
$ yarn migrate:down
```

## Steps to modify database

### 1. Generate migration file

After making any changes to the database schema, you should create a new migration file using command below. This command will generate a new migration file based on the changes you want to make.

```bash
yarn migrate:generate
```

### 2. Review and lock migration in down direction

Once the migration file is generated, navigate to the newly created migration file located in the migrations directory. Review the contents of the migration file to ensure that it includes the correct changes.

After reviewing the migration file, it's important to lock down the migration to prevent accidental execution in the down direction. This step ensures that migrations can only be applied in the up direction.

### 3. Run migration

After locking down the migration file, you can proceed to execute the migration using the command below. This command will apply the changes specified in the migration file to the database schema.

```bash
yarn migrate:up
```

### 4. Start the application

With the database changes successfully applied, you can now start the application and run the new functionality or features that utilize the modified database schema.