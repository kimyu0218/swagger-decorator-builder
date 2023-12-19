import { ResponseStatus } from './types';

export interface SwaggerParam {
  name: string;
  description?: string;
  required?: boolean;
  type?: string;
  isArray?: boolean;
  allowEmptyValue?: boolean;
}

export interface SwaggerBody {
  type: any;
  description?: string;
  required?: boolean;
  isArray?: boolean;
  examples?: object;
}

export interface SwaggerResponse {
  status: ResponseStatus;
  description?: string;
  type?: any;
  headers?: object;
  examples?: object;
  content?: object;
}
