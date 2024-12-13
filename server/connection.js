const { Pool } = require('pg');

const pool = new Pool({
  host: 'aws-0-ap-southeast-1.pooler.supabase.com',
  user: 'postgres.pihdvpfqruelqapbhqdp',
  database: 'postgres',
  password: 'sU6vGxV8HgNubxQ7',
  port: '5432',
  max: 20,
  idleTimeoutMillis: 2000,
  connectionTimeoutMillis: 2000,
});

// project password :   password: 'sU6vGxV8HgNubxQ7',

module.exports = pool;
