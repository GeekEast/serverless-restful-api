import config from 'config';
import { Sequelize } from 'sequelize-typescript';
import path from 'path';

export const sequelize = new Sequelize(config.get("POSTGRES.URI"), {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  },
  models: [path.join(__dirname, '../', 'models')]
});





