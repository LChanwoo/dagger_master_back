import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import RedisStore from 'connect-redis';
import { Redis } from 'ioredis';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import { ValidationPipe } from '@nestjs/common';
import { winstonLogger } from './common/utils/winston.util';
import helmet from 'helmet';

const { SESSION_SECRET, PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: winstonLogger,
  });
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
    origin: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.use(helmet());
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(
    ['/docs'], // docs(swagger end point)에 진입시
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD, // 지정된 ID/비밀번호
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('API example')
    .setDescription('The MoleKiller API description')
    .setVersion('1.0')
    .addTag('molekiller')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT || 9400);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
