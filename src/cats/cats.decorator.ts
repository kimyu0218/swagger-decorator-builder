/**
 * You can make custom swagger decorators
 * by using SwaggerDecoratorBuilder!!
 */
import { SwaggerDecoratorBuilder } from 'src/common/decorators/swagger/builder';
import {
  SwaggerBody,
  SwaggerParam,
} from 'src/common/decorators/swagger/interfaces';

/**
 * Make custom decorator for creating a cat
 * @param {string} target
 * @param {SwaggerBody} body
 * @returns
 */
export const CreateCatDecorator = (target: string, body: SwaggerBody) =>
  new SwaggerDecoratorBuilder(target, 'POST')
    .setBody(body)
    .remove(200)
    .remove(403)
    .remove(404)
    .add({ status: 201, description: 'create cat' }) // add 201 api response
    .build();

/**
 * Make custom decorator for finding all cats
 * @param {string} target
 * @param {any} returnType
 * @returns
 */
export const FindAllCatsDecorator = (target: string, returnType: any) =>
  new SwaggerDecoratorBuilder(target, 'GET', returnType)
    .remove(401)
    .remove(403)
    .remove(404)
    .build();

/**
 * Make custom decorator for findign specific cat
 * @param  {string} target
 * @param {SwaggerParam} param
 * @param {any} returnType
 * @returns
 */
export const FindCatDecorator = (
  target: string,
  param: SwaggerParam,
  returnType: any,
) =>
  new SwaggerDecoratorBuilder(target, 'GET', returnType)
    .setParam(param)
    .remove(403)
    .build();

/**
 * Make custom decorator for updating specific cat
 * @param {string} target
 * @param {SwaggerParam} param
 * @param {SwaggerBody} body
 * @returns
 */
export const UpdateCatDecorator = (
  target: string,
  param: SwaggerParam,
  body: SwaggerBody,
) =>
  new SwaggerDecoratorBuilder(target, 'PATCH')
    .setParam(param)
    .setBody(body)
    .add({ status: 403, description: 'Forbidden - Unauthorized User' }) // overwrite 403 api response description
    .build();

/**
 * Make custom decorator for deleting specific cat
 * @param {string} target
 * @param {SwaggerParam} param
 * @returns
 */
export const DeleteCatDecorator = (target: string, param: SwaggerParam) =>
  new SwaggerDecoratorBuilder(target, 'DELETE').setParam(param).build();
