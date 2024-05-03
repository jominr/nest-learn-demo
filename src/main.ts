import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { MyLoggerService } from './my-logger/my-logger.service';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  /*
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    // this is the outside of any module, 
    // give a little buffer to make sure that that service has been instantiate it.
  });
  app.useLogger(app.get(MyLoggerService)) // use that logger service globally, and now it would be active everywhere
  */
 
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.enableCors() // CORS: cross-origin resource sharing
  app.setGlobalPrefix('api'); // 给每个API加了/api
  await app.listen(3000);
}
bootstrap();
