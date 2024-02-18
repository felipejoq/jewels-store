import pg from 'pg';

const pool = new pg.Pool({
  max: 10,
  idleTimeoutMillis: 10000,
});

export const query = async (query, params) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query(query, params);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error en la transacción:', error);
    throw error;
  } finally {
    client.release();
  }
};