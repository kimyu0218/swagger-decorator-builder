import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { API_DESCRIPTION } from './constants';
import { HttpMethods, ResponseCode, SwaggerBody, SwaggerParam } from './types';

export class SwaggerDecoratorBuilder {
  operation: MethodDecorator;
  param?: MethodDecorator;
  body?: MethodDecorator;
  response: Map<ResponseCode, MethodDecorator> = new Map<
    ResponseCode,
    MethodDecorator
  >();

  constructor(target: string, method: HttpMethods, returnType?: any) {
    this.operation = this.makeApiOperation(target, method);
    this.makeDefaultApiResponses(returnType);
    return this;
  }

  setParam(param: SwaggerParam): SwaggerDecoratorBuilder {
    this.param = this.makeApiParam(param);
    return this;
  }

  setBody(body: SwaggerBody): SwaggerDecoratorBuilder {
    this.body = this.makeApiBody(body);
    return this;
  }

  /**
   * Add Api Response
   * @param {ResponseCode} code - Http Response Code
   * @param {string} description - Description of the Api Response
   * @returns {SwaggerDecoratorBuilder}
   */
  add(code: ResponseCode, description: string): SwaggerDecoratorBuilder {
    this.response.set(code, this.makeResponse(code, description));
    return this;
  }

  /**
   * Remove Api Response
   * @param {ResponseCode} code - Http Response Code
   * @returns {SwaggerDecoratorBuilder}
   */
  remove(code: ResponseCode): SwaggerDecoratorBuilder {
    this.response.delete(code);
    return this;
  }

  /**
   * Return Custom Decorator
   */
  build() {
    const decorators: MethodDecorator[] = [this.operation];
    if (this.param) {
      decorators.push(this.param);
    }
    if (this.body) {
      decorators.push(this.body);
    }
    this.response.forEach((apiResponse: MethodDecorator) => {
      decorators.push(apiResponse);
    });
    return applyDecorators(...decorators);
  }

  /**
   * Make @ApiOperation() Decorator
   * @param {string} target - Target resquested by Client
   * @param {HttpMethods} method - Action requested by Client
   * @returns {MethodDecorator}
   */
  private makeApiOperation(
    target: string,
    method: HttpMethods,
  ): MethodDecorator {
    return ApiOperation({ summary: `${method} ${target}` });
  }

  /**
   * Make @ApiParam() Decorator
   * @param {any} param
   * @returns {MethodDecorator}
   */
  private makeApiParam(param: any): MethodDecorator {
    return ApiParam(param);
  }

  /**
   * Make @ApiBody() Decorator
   * @param {any} body
   * @returns {MethodDecorator}
   */
  private makeApiBody(body: SwaggerBody): MethodDecorator {
    return ApiBody(body);
  }

  /**
   * Automatically Make Default Api Response Decorators
   * You can add and delete response decorators
   * by calling add() and remove() methods.
   *
   * @param {any} returnType - Return Type if the request is successful
   */
  private makeDefaultApiResponses(returnType?: any): void {
    this.response.set(200, this.makeResponse(200, undefined, returnType));
    this.response.set(401, this.makeResponse(401));
    this.response.set(403, this.makeResponse(403));
    this.response.set(404, this.makeResponse(404));
    this.response.set(500, this.makeResponse(500));
  }

  /**
   * Make Api Response Decorators
   * @param {ResponseCode} code - Http Response Code
   * @param {string} desciption - Description of the Api Response
   * @param {any} returnType - Return Type if the request is successful
   * @returns {MethodDecorator}
   */
  private makeResponse(
    code: ResponseCode,
    desciption?: string,
    returnType?: any,
  ): MethodDecorator {
    return ApiResponse({
      status: code,
      description: desciption ? desciption : API_DESCRIPTION[code],
      type: returnType ? returnType : undefined,
    });
  }
}
