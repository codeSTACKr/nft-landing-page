// netlify/functions/sec+.js

exports.handler = async function (event, context) {
  try {
    console.log('Function executed successfully!');
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Hello from Netlify function!' }),
    };
  } catch (error) {
    console.error('Error in function:', error.message);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
