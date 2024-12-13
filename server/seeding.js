const pool = require('./connection');
const data = require('./foods.json');

let newData = data.map((el) => {
  return `('${el.name}', '${el.imageUrl}', ${el.price}, '${el.desc}')`;
});

let newDataToInsert = newData.join(',');

let seedDataQuery = `
  INSERT INTO Foods ("name", "imageUrl", "price", "desc")
  VALUES ${newDataToInsert}
`;

async function runSeed() {
  try {
    await pool.query(seedDataQuery);
    console.log('Success seed table foods');
  } catch (error) {
    console.log(error);
  }
}

runSeed();
