import { seed } from "../../services/postgres";
import { Todo } from "../../models/todo.model";

// Create one
seed(async () => {
  return await Todo.create({
    task: 'wash dish',
    complete: true
  })
}).then(result => {
  console.log(result);
}).catch(error => console.log(error))


// Read One
seed(async () => {
  return await Todo.findOne({
    where: { id: 3 }
  })

}).then(result => {
  console.log(result);
}).catch(error => console.log(error));


// Update One
seed(async () => {
  const todo = await Todo.findOne({
    where: { id: 5 }
  })
  if (todo) {
    return await todo.update({
      task: 'Happy Update'
    })
  }
  return null;

}).then(result => console.log(result))
  .catch(err => console.log(err));


// remove One
seed(async () => {
  const todo = await Todo.findOne({
    where: { id: 4 }
  })
  return await todo.destroy();
}).then(result => console.log(result))
  .catch(err => console.log(err));


