import { SwaggerDecoratorBuilder } from 'src/common/decorators/swagger/builder';
import { SwaggerBody, SwaggerParam } from 'src/common/decorators/swagger/types';

export const CreateCatDecorator = (target: string, body: SwaggerBody) =>
  new SwaggerDecoratorBuilder(target, 'POST').setBody(body).remove(403).build();

export const FindAllCatsDecorator = (target: string, returnType: any) =>
  new SwaggerDecoratorBuilder(target, 'GET', returnType)
    .remove(401)
    .remove(403)
    .remove(404)
    .build();

export const FindCatDecorator = (
  target: string,
  param: SwaggerParam,
  returnType: any,
) =>
  new SwaggerDecoratorBuilder(target, 'GET', returnType)
    .setParam(param)
    .remove(403)
    .build();

export const UpdateCatDecorator = (
  target: string,
  param: SwaggerParam,
  body: SwaggerBody,
) =>
  new SwaggerDecoratorBuilder(target, 'PATCH')
    .setParam(param)
    .setBody(body)
    .add(403, 'Forbidden - Unauthorized User') // overwrite 403 error message
    .build();

export const DeleteCatDecorator = (target: string, param: SwaggerParam) =>
  new SwaggerDecoratorBuilder(target, 'DELETE').setParam(param).build();
