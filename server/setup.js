// file ini untuk melakukan setup table ke dalam database
const pool = require('./connection');

let createTableFoods = `
  CREATE TABLE Foods (
  "id" SERIAL PRIMARY KEY, 
  "name" VARCHAR(50),
  "imageUrl" TEXT, 
  "price" INTEGER,
  "desc" TEXT
);
`;

// koneksi ke database => asynchronous

async function runSetup() {
  try {
    await pool.query(createTableFoods);
    console.log('Success setup table foods');
  } catch (error) {
    console.log(error);
  }
}

runSetup();
