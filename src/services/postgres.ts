import { Sequelize } from 'sequelize-typescript';
import { Todo } from '../models/todo.model';

export const sequelize = new Sequelize(process.env.TODO_DB_URI, {
  // export const sequelize = new Sequelize(config.get("POSTGRES.URI"), {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  },
  models: [Todo]
});

sequelize.sync().then(() => {
  console.log("Synchornization Done.")
}).catch(() => console.log("Synchronization Failed."))

export const seed = async (func: Function) => {
  await sequelize.sync();
  const result = await func();
  sequelize.close();
  return result;
}








