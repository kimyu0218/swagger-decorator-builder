import { STATUS_CODES } from 'http';

export type HttpMethods =
  | 'GET'
  | 'HEAD'
  | 'PUT'
  | 'POST'
  | 'PATCH'
  | 'DELETE'
  | 'TRACE'
  | 'OPTIONS';

export type ResponseStatus = number & keyof typeof STATUS_CODES;
