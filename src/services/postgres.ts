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
  const result = await func();
  sequelize.close();
  return result;
}








