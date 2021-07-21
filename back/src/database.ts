import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: parseFloat(process.env.POSTGRES_PORT ?? '5432'),
  database: process.env.POSTGRES_DATABASE,
});

export default pool;
