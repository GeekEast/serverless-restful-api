import { Todo } from './todo.model';
import { seed } from '../services/postgres';

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



