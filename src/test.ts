
import { sequelize } from './services/postgres';
import Todo from './models/todo.model';
sequelize.sync();
const todo = new Todo({
  tasks: "wash dish",
  complete: true
})
todo.save();

