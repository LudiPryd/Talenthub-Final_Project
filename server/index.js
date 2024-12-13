const express = require('express');
const pool = require('./connection');
const cors = require('cors');

const app = express();

const port = 3000;

// nambahin cors/ permission
app.use(cors());

app.get('/', (request, response) => {
  response.send('Connection Success');
});

app.get('/foods', async (request, response) => {
  try {
    const data = await pool.query(`SELECT * FROM Foods`);

    let dataFoods = data.rows;

    response.json(dataFoods);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/foods/:id', async (request, response) => {
  try {
    const data = await pool.query(
      `SELECT * FROM Foods WHERE id = ${request.params.id}`
    );

    let dataFoods = data.rows[0];

    if (!dataFoods) {
      response.status(404).json({ message: 'Data Not Found' });
    } else {
      response.json(dataFoods);
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/foods/:category', async (request, response) => {
  try {
    const data = await pool.query(
      `SELECT * FROM foods WHERE category = ${request.params.category}`
    );

    let dataFoods = data.rows;

    if (!dataFoods) {
      response.status(404).json({ message: 'Data Not Found' });
    } else {
      response.json(dataFoods);
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
