<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table Of Content

- [Project](#project)
  - [Tools](#tools)
  - [Architecture](#architecture)
  - [Metadata](#metadata)
- [Sequelize with Typescript](#sequelize-with-typescript)
- [Issues](#issues)
  - [**Error: Please install pg package manually**](#error-please-install-pg-package-manually)
  - [The response is very slow using `Sequelize`](#the-response-is-very-slow-using-sequelize)
  - [Should Sync before using any model](#should-sync-before-using-any-model)
  - [What is the difference between `PATCH` and `PUT`?](#what-is-the-difference-between-patch-and-put)
- [Refernece](#refernece)
- [Blog](#blog)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Project
### Tools
- **Postman** for `testing`
- **serverless-offline** for `local api development`
- **Postgres** as `database` in **Heroku**
- **Sequelize** as the `ORM`

### Architecture
- **Controllers**: defined in files like `handler.ts`
- **Routers**: `serverless.yml`
- **Models**: `./src/models`
- **Services**: `./src/services`

### Metadata
- **id**: integer (`primary key`,`not null`,`auto-incrementing`)
- **task**: string
- **completed**: boolean(default `false`)
- **created_at**: date(default `today`)
- **updated_at**: date(default `today`)
- **deleted_at**: date

## Sequelize with Typescript
- **Install**
```sh
yarn add sequelize sequelize-typescript reflect-metadata @types/validator @types/node @types/bluebird
```
- [Official Guides](https://www.npmjs.com/package/sequelize-typescript)
  - [Starter](https://github.com/RobinBuschmann/sequelize-typescript-example/tree/master/lib/models)
  - [`@Table`](https://sequelize.org/master/manual/models-definition.html#configuration)
  - [`@Column`](https://www.npmjs.com/package/sequelize-typescript#column)
  - [`Datatypes`](https://sequelize.org/master/manual/models-definition.html#data-types)
  - [@PrimaryKey](https://www.npmjs.com/package/sequelize-typescript#primary-key)
  - [@CreatedAt,@UpdatedAt,@DeletedAt](https://www.npmjs.com/package/sequelize-typescript#createdat--updatedat--deletedat)
  - [More Decorators](https://www.npmjs.com/package/sequelize-typescript#shortcuts)
  - [Model Validation](https://www.npmjs.com/package/sequelize-typescript#model-validation)
```javascript
@Table({
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
  underscored: true,
})
export class Todo extends Model<Todo> {
  @Column({
    type: DataType.STRING
  })
  task?: string;

  @Column({
    defaultValue: false,
    type: DataType.BOOLEAN
  })
  complete?: boolean;
}
```
- [Configuration](https://www.npmjs.com/package/sequelize-typescript#configuration)
```javascript
// postgres
export const sequelize = new Sequelize(config.get("POSTGRES.URI"), {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  },
  models: [Todo]
});

export const seed = async (func: Function) => {
  await sequelize.sync();
  const result = await func();
  sequelize.close();
  return result;
}
```
- [CRUD](http://semlinker.com/node-sequelize-quickstart/)
```javascript
// Rreate one
seed(async () => {
  await Todo.create({
    task: 'wash dish',
    complete: true
  })
})

// Read One
seed(async () => {
  const todo: Todo = await Todo.findOne({
    where: { id: 2 }
  })
  console.log(todo.id);
})

// Read Many
seed(async () => {
  const todos: Todo[] = await Todo.findAll({
    where: { id: 2 }
  })
  console.log(todos);
})

// Update One
seed(async () => {
  const todo = await Todo.findOne({
    where: { id: 2 }
  });
  if (todo) {
    await todo.update({
      task: 'Happy Update'
    })
  }
})


// Remove One logically
seed(async () => {
  const todo = await Todo.findOne({
    where: { id: 2 }
  })
  if (todo) {
    await todo.destroy();
  }
})

// Remove All logically
seed(async () => {
  await Todo.destroy({
    where: { id: 1 }
  })
})

// Remove One physically
seed(async () => {
  const todo = await Todo.findOne({
    where: { id: 1 }
  })
  if (todo) {
    await todo.destroy({ force: true });
  }
})


// Remove All physically
seed(async () => {
  await Todo.destroy({
    where: { id: 2 },
    force: true
  })
})
```

## Issues
### **Error: Please install pg package manually**
- [Solution:](https://github.com/webpack/webpack/issues/4879#issuecomment-427240835) `yarn add webpack-node-externals`
```javascript
// webpack.config.js
const nodeExternals = require('webpack-node-externals');
module.exports = {
  ...
  externals: [nodeExternals()],
  ...
```
### The response is very slow using `Sequelize`
- Oh man, this is not becuase `Sequelize`. It's because you're far from the `Database Server`.
- If you have many servers hosted in different places in the world, use `cloudfront` to help you request to the nearest server.
- By the way, `within` the API you have to do response `synchronously`.
- But when you are outside the API, for instance in the frontedn, you should do call `asychronously`
### Should Sync before using any model
- If you don't `sync()` before using the model, you will get an error like `"Todo" needs to be added to a Sequelize instance.' `
- One way to deal with `sync()`, which need you to add `sync()` a lot of times.
```javascript
// postgres: no seqeulize.sync() call
// in controllers
await sequelize.sync();
const todo = await Todo.create(JSON.parse(event.body));
```
- Another way to deal with `sync()`:
  - Dynamicall add models
  - Automatically call `sync()` before you want to use model
```javascript
// postgres.ts add
sequelize.sync().then(() => {
  console.log("Synchornization Done.")
}).catch(() => console.log("Synchronization Failed."))

// Todo.ts add before CRUD method
sequelize.addModels([Todo]); // will synchronize with database and and models
```
### What is the difference between `PATCH` and `PUT`?
- `PATCH` is used to update parts of an object.  **Default**
- `PUT` is used to update the whole object.


## Refernece
- [Medium: Get stated with Sequelize](https://medium.com/@zhhjoseph/getting-started-with-sequelize-dd6045f366e6)

## Blog
- [James Long](https://jlongster.com/)
