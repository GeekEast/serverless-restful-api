<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table Of Content

- [Takeaway](#takeaway)
- [Tools](#tools)
- [Architecture](#architecture)
- [TODO Meta](#todo-meta)
- [Sequelize](#sequelize)
  - [Connect](#connect)
  - [Test Connection](#test-connection)
- [Further](#further)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Takeaway
- `Router`: s`erverless.yml`
- `Database`: AWS `RDS` with `sequelize` as the ORM

### Tools
- **Postman** for `testing`
- **serverless-offline** for `local development`
- **Postgres** as `database` in **Heroku**
- **Sequelize** as the `orm`

### Architecture
- Controllers: defined in files like `handler.ts`
- Routers: `serverless.yml`

### TODO Meta
- `id*`: integer (`auto-incrementing`)
- `task`: string
- `completed`: boolean(default `false`)
- `created_at`: date(default `today`)
- `updated_at`: date(default `today`)
- `deleted_at`: date

### Sequelize
- `Model` === Database `Table`
- You could define `model` `before` connecting to database
- After connecting to database, sequelize will `automatically` `update` database accoording to models.
#### Connect
```javascript
const sequelize = new Sequelize(config.get("POSTGRES.URI"), {
  dialect: 'postgres',
  // heroku requires ssl connection
  dialectOptions: {
    ssl: true
  }
});
```
#### Test Connection
```javascript
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
```

### Further
- sequelize-typescript: enhance sequelize-typescript with decorator
