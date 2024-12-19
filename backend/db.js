const { Pool } = require('pg');

// Create a new pool instance to manage PostgreSQL connections
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "MacBookAir",
    port: 5432,
  });

// Test the connection to the database (optional)
pool.connect()
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

// Export the pool instance to use it in other files
module.exports = pool;