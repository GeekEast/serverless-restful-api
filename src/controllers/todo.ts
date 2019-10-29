import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import _ from 'lodash';
import { seed } from '../services/postgres';
import { Todo } from '../models/todo.model';

// /**
//  * CRUD: create a todo
//  * @param event event object
//  * @param _context context object
//  */
// export const create: APIGatewayProxyHandler = async (event, _context) => {
//   const attrs: Object = event.body;
//   const todo: Todo = await seed(async () => await Todo.create(attrs));
//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       data: todo ? todo.toJSON() : null
//     }, null, 2),
//   };
// }

/**
 * CRUD: create a todo
 * @param event event object
 * @param _context context object
 */
export const create: APIGatewayProxyHandler = async (event, _context) => {
  try {
    const todo = await Todo.create(JSON.parse(event.body));
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: todo ? todo.toJSON() : ""
      })
    }
  } catch (err) {
    return {
      statusCode: 400,
      body: "Internal Error"
    }
  }
}

/**
 * CRUD: read a todo
 * @param event event object
 * @param _context context object
 */
export const read: APIGatewayProxyHandler = async (event, _context) => {
  const queryParameters = event.queryStringParameters
  const todo: Todo = await seed(async () => {
    return await Todo.findOne({
      where: queryParameters
    })
  });
  return {
    statusCode: 200,
    body: JSON.stringify({
      data: todo ? todo.toJSON() : null
    }, null, 2),
  };
}

/**
 * CRUD: update a todo
 * @param event event object
 * @param _context context object
 */
export const update: APIGatewayProxyHandler = async (event, _context) => {
  // event,

  Todo.findOne({})

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'update function'
    }, null, 2),
  };
}


/**
 * CRUD: delete a todo
 * @param event event object
 * @param _context context object
 */
export const remove: APIGatewayProxyHandler = async (_context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'delete function'
    }, null, 2),
  };
}


