import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import _ from 'lodash';

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
export const read: APIGatewayProxyHandler = async (_context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'get function'
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


