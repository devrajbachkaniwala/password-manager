import express from 'express';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db, pgClient } from './drizzle';
import { Env } from './utils';
import { routes } from './modules/routes';
import cors from 'cors';

async function main() {
  try {
    let retries = 5;
    while (retries > 0) {
      try {
        retries--;
        await pgClient.connect();

        console.log('Database connected successfully');
        break;
      } catch (err: any) {
        console.error('Failed to connect to database');
        console.error(`Retrying to connect to database`);
        console.error(`Retries left: ${retries}`);

        if (retries !== 0) {
          await new Promise((res) => setTimeout(res, 5000));
        }
      }
    }
    if (retries === 0) {
      console.error('Failed to connect to database');
      process.exit(1);
    }

    await migrate(db, { migrationsFolder: './drizzle' });

    const app = express();

    // const origins = ['http://localhost:3000'];
    // app.use(
    //   cors({
    //     origin: (origin, callback) => {
    //       if (origins.indexOf(origin) !== -1) {
    //         callback(null, true);
    //       } else {
    //         callback(new Error('Not allowed by cors'));
    //       }
    //     }
    //     // credentials: true
    //   })
    // );
    app.use(cors());

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    for (const route of Object.values(routes)) {
      app.use('/', route);
    }

    app.listen(Env.PORT, () =>
      console.log(`Server started at http://localhost:${Env.PORT}`)
    );
  } catch (err: any) {
    console.error(err);
  }
}

main();
