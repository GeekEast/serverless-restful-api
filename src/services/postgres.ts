import { Sequelize } from 'sequelize';
import config from 'config';
export default new Sequelize(config.get("POSTGRES.URI"));



