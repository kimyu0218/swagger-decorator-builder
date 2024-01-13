/**
 * https://github.com/nestjs/swagger/blob/master/lib/decorators/api-operation.decorator.ts
 */
import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export interface SwaggerOperation extends Partial<OperationObject> {}
