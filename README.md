<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table Of Content

- [Project](#project)
  - [Tools](#tools)
  - [Architecture](#architecture)
  - [Model](#model)
- [Sequelize with Typescript](#sequelize-with-typescript)
- [Refernece](#refernece)

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

### Model
- Metadata
  - `id*`: integer (`auto-incrementing`)
  - `task`: string
  - `completed`: boolean(default `false`)
  - `created_at`: date(default `today`)
  - `updated_at`: date(default `today`)
  - `deleted_at`: date
- Sequelize Model
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

## Sequelize with Typescript
- Install
```sh
yarn add sequelize sequelize-typescript reflect-metadata @types/validator @types/node @types/bluebird
```
- [Official Guides](https://www.npmjs.com/package/sequelize-typescript)
  - [Starter](https://github.com/RobinBuschmann/sequelize-typescript-example/tree/master/lib/models)
  - [**@Table**](https://sequelize.org/master/manual/models-definition.html#configuration)
  - [**@Column**](https://www.npmjs.com/package/sequelize-typescript#column)
  - [**Datatypes**](https://sequelize.org/master/manual/models-definition.html#data-types)
  - [@PrimaryKey](https://www.npmjs.com/package/sequelize-typescript#primary-key)
  - [@CreatedAt,@UpdatedAt,@DeletedAt](https://www.npmjs.com/package/sequelize-typescript#createdat--updatedat--deletedat)
  - [More Decorators](https://www.npmjs.com/package/sequelize-typescript#shortcuts)
  - [Model Validation](https://www.npmjs.com/package/sequelize-typescript#model-validation)
- [Configuration](https://www.npmjs.com/package/sequelize-typescript#configuration)
```javascript
// postgres
import config from 'config';
import { Sequelize } from 'sequelize-typescript';
import { Todo } from '../models/todo.model';

export const sequelize = new Sequelize(config.get("POSTGRES.URI"), {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  },
  models: [Todo]
});

export const seed = async (func: Function) => {
  await sequelize.sync();
  await func();
  sequelize.close();
}
```
- Testing
```javascript
import { Todo } from './models/todo.model';
import { seed } from './services/postgres';

seed(async () => {
  await Todo.create({
    task: 'wash dish',
    complete: true
  })
})
```
- CRUD
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



## Refernece
- [Why you should avoid orms?](https://blog.logrocket.com/why-you-should-avoid-orms-with-examples-in-node-js-e0baab73fa5/)
- [Get stated with Sequelize](https://medium.com/@zhhjoseph/getting-started-with-sequelize-dd6045f366e6)
- [Sequelize CRUD](http://semlinker.com/node-sequelize-quickstart/)
