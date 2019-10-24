<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table Of Content

- [Takeaway](#takeaway)
- [Tools](#tools)
- [Architecture](#architecture)
- [TODO Meta](#todo-meta)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Takeaway
- `Router`: s`erverless.yml`
- `Database`: AWS `RDS` with `sequelize` as the ORM

### Tools
- **Postman** for `testing`
- **serverless-offline** for `local development`
- **Postgres** as `database` in RDS
- **Sequelize** as the `orm`

### Architecture
- Controllers: defined in files like `handler.ts`
- Routers: `serverless.yml`

### TODO Meta
- `id*`: integer (`auto-incrementing`)
- `name`: string
- `completed`: boolean(default `false`)
- `created_at`: date(default `today`)
- `updated_at`: date(default `today`)
- `deleted_at`: date

