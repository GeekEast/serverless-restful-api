import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

export const create: APIGatewayProxyHandler = async (_context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'post method',
    }, null, 2),
  };
}


