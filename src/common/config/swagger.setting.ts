import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Custom Decorator Test')
    .setDescription('The Custom Decorator API Examples')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
