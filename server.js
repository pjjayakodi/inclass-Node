const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Variable to store the user's name
let userName = '';

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET endpoint to receive user's name as greeting
app.get('/greeting', (req, res) => {
  // Extract name from query parameter
  userName = req.query.name || '';

  console.log(`Name received: ${userName}`);

  // Redirect to GET endpoint to display the name
  res.redirect('/display-name');
});

// GET endpoint to display the user's name
app.get('/display-name', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Display Name</title>
      <style>
        body { font-family: Arial; text-align: center; padding: 50px; }
        .container { background: #f0f0f0; padding: 30px; border-radius: 5px; max-width: 500px; margin: 0 auto; }
        h1 { color: #333; }
        .name { font-size: 24px; color: #667eea; font-weight: bold; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome!</h1>
        <p>Your name is:</p>
        <div class="name">${userName}</div>
        <a href="/">Go Back</a>
      </div>
    </body>
    </html>
  `);
});

// GET endpoint to show the form
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Submit Your Name</title>
      <style>
        body { font-family: Arial; text-align: center; padding: 50px; }
        .container { background: #f0f0f0; padding: 30px; border-radius: 5px; max-width: 500px; margin: 0 auto; }
        h1 { color: #333; }
        form { display: flex; flex-direction: column; gap: 15px; }
        input { padding: 10px; font-size: 16px; border: 2px solid #ddd; border-radius: 5px; }
        button { padding: 10px; font-size: 16px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer; }
        button:hover { background: #764ba2; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Enter Your Name</h1>
        <form action="/greeting" method="GET">
          <input type="text" name="name" placeholder="Enter your name" required>
          <button type="submit">Get Greeting</button>
        </form>
      </div>
    </body>
    </html>
  `);
});

// Optional: GET endpoint to see the current stored name (API)
app.get('/get-name', (req, res) => {
  res.json({ name: userName });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
