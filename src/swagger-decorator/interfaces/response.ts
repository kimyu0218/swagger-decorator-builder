/**
 * https://github.com/nestjs/swagger/blob/master/lib/decorators/api-response.decorator.ts
 * https://github.com/nestjs/swagger/blob/master/lib/interfaces/open-api-spec.interface.ts#L155
 */
import {
  ContentObject,
  HeadersObject,
  LinksObject,
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { SwaggerHttpStatus, SwaggerType } from '../types';

export interface SwaggerResponse {
  content?: ContentObject;
  description?: string;
  headers?: HeadersObject;
  isArray?: boolean;
  links?: LinksObject;
  schema?: SchemaObject & Partial<ReferenceObject>;
  status?: SwaggerHttpStatus;
  type?: SwaggerType;
}
