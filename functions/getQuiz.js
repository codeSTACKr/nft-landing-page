import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { planetscale } from "@netlify/planetscale";

export const handler: Handler = async function (event: HandlerEvent, context: HandlerContext) {
  try {
    const connection = await planetscale.createConnection({
      host: process.env.PLANETSCALE_HOST,
      user: process.env.PLANETSCALE_USERNAME,
      password: process.env.PLANETSCALE_PASSWORD,
      database: process.env.PLANETSCALE_DATABASE_NAME,
    });

    const quizId = event.queryStringParameters.quizId;

    const [rows] = await connection.query('SELECT * FROM Questions WHERE quizID = ?', [quizId]);

    return {
      statusCode: 200,
      body: JSON.stringify(rows),
    };
  } catch (error) {
    console.error('Error fetching questions:', error.message);

    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};