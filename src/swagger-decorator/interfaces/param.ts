/**
 * https://github.com/nestjs/swagger/blob/master/lib/decorators/api-param.decorator.ts
 * https://github.com/nestjs/swagger/blob/master/lib/interfaces/open-api-spec.interface.ts#L122
 */
import {
  ContentObject,
  ExampleObject,
  ParameterStyle,
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { SwaggerEnumType } from '@nestjs/swagger/dist/types/swagger-enum.type';
import { SwaggerType } from '../types';

export interface SwaggerParam {
  allowEmptyValue?: boolean;
  allowReserved?: boolean;
  content?: ContentObject;
  description?: string;
  deprecated?: boolean;
  enum?: SwaggerEnumType;
  enumName?: string;
  example?: any;
  examples?: Record<string, ExampleObject | ReferenceObject>;
  explode?: boolean;
  format?: string;
  name: string;
  required?: boolean;
  schema: SchemaObject;
  style?: ParameterStyle;
  type?: SwaggerType;
}
