import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from './schema';
import { Env } from '../utils';

export const pgClient = new Client({
  connectionString: Env.DB_CONNECTION_STRING
});

export const db: NodePgDatabase<typeof schema> = drizzle(pgClient, { schema });
