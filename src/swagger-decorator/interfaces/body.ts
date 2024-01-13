/**
 * https://github.com/nestjs/swagger/blob/master/lib/decorators/api-body.decorator.ts
 * https://github.com/nestjs/swagger/blob/master/lib/interfaces/open-api-spec.interface.ts#L127
 */
import {
  ExamplesObject,
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { SwaggerEnumType } from '@nestjs/swagger/dist/types/swagger-enum.type';
import { SwaggerType } from '../types';

export interface SwaggerBody {
  description?: string;
  enum?: SwaggerEnumType;
  examples?: ExamplesObject;
  isArray?: boolean;
  required?: boolean;
  schema: SchemaObject | ReferenceObject;
  type?: SwaggerType;
}
