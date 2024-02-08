const { planetscale } = require("@netlify/planetscale");

exports.handler = async function (event, context) {
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
