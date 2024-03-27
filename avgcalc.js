const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const numbersData = {};

app.post('/numbers/:numberId', (req, res) => {
  const { numberId } = req.params;
  const { number } = req.body;

  if (!Number.isInteger(number)) {
    return res.status(400).json({ error: 'Invalid number format' });
  }

  if (!numbersData[numberId]) {
    numbersData[numberId] = [];
  }

  numbersData[numberId].push(number);
  res.status(201).send('Number added successfully');
});

app.get('/numbers/:numberId', (req, res) => {
  const { numberId } = req.params;
  const numbers = numbersData[numberId];

  if (!numbers || numbers.length === 0) {
    return res.status(404).json({ error: 'No numbers found for the provided ID' });
  }

  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  const average = sum / numbers.length;

  res.status(200).json({ average });
});

app.listen(port, () => {
  console.log(`Average Calculator microservice listening at http://localhost:${port}`);
});
