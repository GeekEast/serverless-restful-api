import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import _ from 'lodash';
import { seed } from '../services/postgres';
import { Todo } from '../models/todo.model';

/**
 * CRUD: create a todo
 * @param event event object
 * @param _context context object
 */
export const create: APIGatewayProxyHandler = async (event, _context) => {

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'post function'
    }, null, 2),
  };
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
export const update: APIGatewayProxyHandler = async (_context) => {
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


