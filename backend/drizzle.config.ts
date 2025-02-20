import { defineConfig } from 'drizzle-kit';
import { Env } from './src/utils';

export default defineConfig({
  schema: './src/drizzle/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: Env.DB_CONNECTION_STRING
  }
});
