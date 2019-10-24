import TodoFactory from './todo';
import sequelize from '../services/postgres';
import { DataTypes } from 'sequelize';
export { TodoFactory }

export const todo = TodoFactory(sequelize, DataTypes);




