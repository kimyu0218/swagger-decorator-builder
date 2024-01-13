/* eslint-disable @typescript-eslint/ban-types */
import { Type } from '@nestjs/common';

export type HttpMethods =
  | 'GET'
  | 'HEAD'
  | 'PUT'
  | 'POST'
  | 'PATCH'
  | 'DELETE'
  | 'TRACE'
  | 'OPTIONS';

export type SwaggerHttpStatus =
  | number
  | 'default'
  | '1XX'
  | '2XX'
  | '3XX'
  | '4XX'
  | '5XX';

export type SwaggerType = Type<unknown> | Function | [Function] | string;
