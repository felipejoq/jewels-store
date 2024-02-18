import 'dotenv/config';
import env from 'env-var'

export const envs = {
  PORT: env.get('PORT').required().asPortNumber(),
  PGUSER: env.get('PGUSER').required().asString(),
  PGHOST: env.get('PGHOST').required().asString(),
  PGPASSWORD: env.get('PGPASSWORD').required().asString(),
  PGDATABASE: env.get('PGDATABASE').required().asString(),
  PGPORT: env.get('PGPORT').required().asPortNumber(),
}