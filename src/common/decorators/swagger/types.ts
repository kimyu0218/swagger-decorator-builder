export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ResponseCode = 200 | 400 | 401 | 403 | 404 | 409 | 500 | 502;

export interface SwaggerParam {
  type: string;
  name: string;
  description?: string;
}

export interface SwaggerBody {
  type: any;
  description?: string;
}
