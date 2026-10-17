const express = require('express');
const cors = require('cors');
//Creates your server and keeps it in a variable called app. Everything below is added to app.
const app = express();
//use means “run this for every request”. It switches on CORS, so Angular is allowed to call this server.
app.use(cors());
//Lets the server read JSON data sent by Angular. Without it, req.body would be empty. We need it for the chat.
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is working');
});

app.post('/chat', (req, res) => {
  const message = req.body.message;
  res.json({ reply: 'You said: ' + message });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});