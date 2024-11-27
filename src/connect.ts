import { Pool } from 'pg';

// Database connection configuration
const pool = new Pool({
  user: 'postgres', // Replace with your PostgreSQL username
  host: 'localhost', // Replace with your host, e.g., '127.0.0.1'
  database: 'postgres', // Replace with your database name
  password: 'Personal@1', // Replace with your PostgreSQL password
  port: 5432, // Replace with your PostgreSQL port (default is 5432)
});

// Function to test and initialize the database connection
const connectPG = async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to the PostgreSQL database');
    client.release(); // Release the client back to the pool
  } catch (err:any) {
    console.error('Error connecting to the database:', err.stack);
    process.exit(1); // Exit the process if the connection fails
  }
};

export { pool, connectPG };
