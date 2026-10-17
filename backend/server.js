const express = require('express');
const cors = require('cors');
//Creates your server and keeps it in a variable called app. Everything below is added to app.
const app = express();
//use means “run this for every request”. It switches on CORS, so Angular is allowed to call this server.
app.use(cors());
//Lets the server read JSON data sent by Angular. Without it, req.body would be empty. We need it for the chat.
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server v2 is working');
});

app.post('/chat', async (req, res) => {
  const message = req.body.message;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL}:generateContent`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': process.env.GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }],
      }),
    });

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      console.log(data);
      return res.status(500).json({ reply: 'AI did not return an answer.' });
    }

    res.json({ reply });
  } catch (error) {
    console.log(error);
    res.status(500).json({ reply: 'Something went wrong on the server.' });
  }
});


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});