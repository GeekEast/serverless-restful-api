import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import _ from 'lodash';
import { Todo } from '../models/todo.model';
import { sequelize } from '../services/postgres';
sequelize.addModels([Todo]); // will synchronize with database and and models

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
        data: todo ? todo.toJSON() : null
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
  try {
    const todo = await Todo.findOne({ where: event.queryStringParameters });
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: todo ? todo.toJSON() : null
      }, null, 2),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 400,
      body: "Internal Error"
    }
  }
}

/**
 * CRUD: update a todo
 * @param event event object
 * @param _context context object
 */
export const update: APIGatewayProxyHandler = async (event, _context) => {
  try {
    const body = JSON.parse(event.body);
    const id = event.queryStringParameters.id;
    const todo = await Todo.findOne({ where: { id } });
    let updated_todo: Todo | null;
    if (todo) {
      updated_todo = await todo.update(body)
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: updated_todo ? updated_todo.toJSON() : null
      }, null, 2),
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        data: "Internal Error"
      })
    }

  }

}


/**
 * CRUD: delete a todo
 * @param event event object
 * @param _context context object
 */
export const remove: APIGatewayProxyHandler = async (event, _context) => {
  try {
    const todo = await Todo.findOne({ where: event.queryStringParameters });
    await todo.destroy();
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: todo ? todo.toJSON() : "deleted"
      }, null, 2),
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: "Internal Error"
    }
  }
}


