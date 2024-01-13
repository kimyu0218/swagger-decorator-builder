/**
 * You can make custom Swagger decorators
 * by using SwaggerDecoratorBuilder!!
 */
import { ApiBodyOptions, ApiParamOptions } from '@nestjs/swagger';
import { SwaggerDecoratorBuilder } from 'src/swagger-decorator-builder';

/**
 * Create a custom Swagger decorator for creating a cat.
 * @param {string} target - The target requested by the client.
 * @param {ApiBodyOptions} body - The Swagger options for the request body.
 * @returns
 */
export const CreateCatDecorator = (target: string, body: ApiBodyOptions) =>
  new SwaggerDecoratorBuilder(target, 'POST')
    .setBody(body) // Set the request body.
    .removeResponse(200) // Remove default 200 API response.
    .removeResponse(403) // Remove default 403 API response.
    .removeResponse(404) // Remove default 404 API response.
    .addResponse({ status: 201, description: 'create cat' }) // Add 201 API response.
    .build();

/**
 * Create a custom Swagger decorator for finding all cats
 * @param {string} target - The target requested by the client.
 * @param {any} returnType - The return type when the HTTP response code is 200.
 * @returns
 */
export const FindAllCatsDecorator = (target: string, returnType: any) =>
  new SwaggerDecoratorBuilder(target, 'GET', returnType)
    .removeResponse(401) // Remove the default 401 API response.
    .removeResponse(403) // Remove the default 403 API response.
    .removeResponse(404) // Remove the default 404 API response.
    .build();

/**
 * Make custom decorator for findign specific cat
 * @param  {string} target - The target requested by the client.
 * @param {ApiParamOptions} param - The Swagger options for the request param.
 * @param {any} returnType - The return type when the HTTP response code is 200.
 * @returns
 */
export const FindCatDecorator = (
  target: string,
  param: ApiParamOptions,
  returnType: any,
) =>
  new SwaggerDecoratorBuilder(target, 'GET', returnType)
    .addParam(param) // Set the request param.
    .removeResponse(403) // Remove the default 403 API response.
    .build();

/**
 * Make custom decorator for updating specific cat
 * @param {string} target - The target requested by the client.
 * @param {ApiParamOptions} param - The Swagger options for the request param.
 * @param {ApiBodyOptions} body - The Swagger options for the request body.
 * @returns
 */
export const UpdateCatDecorator = (
  target: string,
  param: ApiParamOptions,
  body: ApiBodyOptions,
) =>
  new SwaggerDecoratorBuilder(target, 'PATCH')
    .addParam(param) // Set the request param.
    .setBody(body) // Set the request body.
    .addResponse({ status: 403, description: 'Forbidden - Unauthorized User' }) // Overwrite the default 403 API response.
    .build();

/**
 * Make custom decorator for deleting specific cat
 * @param {string} target - The target requested by the client.
 * @param {ApiParamOptions} param - The Swagger options for the request param.
 * @returns
 */
export const DeleteCatDecorator = (target: string, param: ApiParamOptions) =>
  new SwaggerDecoratorBuilder(target, 'DELETE')
    .addParam(param) // Set the request param.
    .build();
