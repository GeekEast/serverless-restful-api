import config from 'config';
import { Sequelize } from 'sequelize';
export const sequelize = new Sequelize(config.get("POSTGRES.URI"), {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }
});




