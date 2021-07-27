import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.POSTGRES_CLIENTUSER,
  password: process.env.POSTGRES_CLIENTPASSWORD,
  host: process.env.POSTGRES_HOST,
  port: parseFloat(process.env.POSTGRES_PORT ?? '5432'),
  database: process.env.POSTGRES_DB,
});

export default pool;
