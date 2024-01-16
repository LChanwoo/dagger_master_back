import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import RedisStore from 'connect-redis';
import { Redis } from 'ioredis';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

const { SESSION_SECRET, PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(
    session({
      store: new RedisStore({
        client: new Redis({
          host: '0.0.0.0',
          port: 6379,
        }),
      }),
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      },
    }),
  );
  app.enableCors({
    credentials: true,
  });
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(PORT || 9400);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
