const { Pool } = require('pg');
const config = require('./index');

const pool = new Pool(config.db);

pool.on('connect', () => {
  console.log('✅ DB connected');
});

module.exports = pool;