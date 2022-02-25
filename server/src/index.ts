import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import express from 'express';
import session from 'express-session';
import createSchema from 'lib/createSchema';
import prisma from 'lib/prisma';
import redis from 'lib/redis';
import path from 'path';
const dotenvPath = process.env.NODE_ENV === 'production' ? path.join(__dirname, '..', '.env') : path.join(__dirname, '..', `.env.${process.env.NODE_ENV}`);
require('dotenv').config({ path: dotenvPath });

const PORT = process.env.PORT || 4000;
const corsOptions = {
  credentials: true,
  origin: 'https://studio.apollographql.com',
};

const main = async () => {
  const schema = await createSchema();
  const app = express();
  const apolloServer = new ApolloServer({ schema, context: ({ req, res }: any) => ({ req, res }) });
  const RedisStore = connectRedis(session);

  app.set('trust proxy', process.env.NODE_ENV !== 'production');

  app.use(
    session({
      store: new RedisStore({
        client: redis,
      }),
      name: process.env.SECRET_COOKIE,
      secret: process.env.SECRET_SESSION as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
        sameSite: 'none',
      },
    })
  );

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: corsOptions,
  });

  app.listen(PORT, () => {
    console.log('\x1b[32m', `🚀 Server started on http://localhost:${PORT}/graphql 🚀`);
  });
};

main()
  .catch((e: any) => {
    console.error('\x1b[31m', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
