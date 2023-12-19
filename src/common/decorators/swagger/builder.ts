import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiResponseOptions,
} from '@nestjs/swagger';
import { STATUS_CODES } from 'http';
import { SwaggerBody, SwaggerParam, SwaggerResponse } from './interfaces';
import { HttpMethods, ResponseStatus } from './types';

export * from './types';
export * from './interfaces';

export class SwaggerDecoratorBuilder {
  operation: MethodDecorator;
  param?: MethodDecorator;
  body?: MethodDecorator;
  response: Map<ResponseStatus, MethodDecorator> = new Map<
    ResponseStatus,
    MethodDecorator
  >();

  constructor(target: string, method: HttpMethods, returnType?: any) {
    this.operation = this.makeApiOperation(target, method);
    this.makeDefaultApiResponses(returnType);
    return this;
  }

  /**
   * Make @ApiParam() decorator
   * @param {SwaggerParam} param
   * @returns {SwaggerDecoratorBuilder}
   */
  setParam(param: SwaggerParam): SwaggerDecoratorBuilder {
    this.param = this.makeApiParam(param);
    return this;
  }

  /**
   * Make @ApiBody() decorator
   * @param {SwaggerBody} body
   * @returns {SwaggerDecoratorBuilder}
   */
  setBody(body: SwaggerBody): SwaggerDecoratorBuilder {
    this.body = this.makeApiBody(body);
    return this;
  }

  /**
   * Add or revise api response
   * @param {SwaggerResponse} response
   * @returns {SwaggerDecoratorBuilder}
   */
  add(response: SwaggerResponse): SwaggerDecoratorBuilder {
    this.response.set(response.status, this.makeApiResponse(response));
    return this;
  }

  /**
   * Remove api response
   * @param {ResponseStatus} status - http response status
   * @returns {SwaggerDecoratorBuilder}
   */
  remove(status: ResponseStatus): SwaggerDecoratorBuilder {
    this.response.delete(status);
    return this;
  }

  /**
   * Return custom decorator
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
   * Make @ApiOperation() decorator
   * @param {string} target - target resquested by client
   * @param {HttpMethods} method - action requested by client
   * @returns {MethodDecorator}
   */
  private makeApiOperation(
    target: string,
    method: HttpMethods,
  ): MethodDecorator {
    return ApiOperation({ summary: `${method} ${target}` });
  }

  /**
   * Make @ApiParam() decorator
   * @param {SwaggerParam} param
   * @returns {MethodDecorator}
   */
  private makeApiParam(param: SwaggerParam): MethodDecorator {
    return ApiParam(param);
  }

  /**
   * Make @ApiBody() decorator
   * @param {SwaggerBody} body
   * @returns {MethodDecorator}
   */
  private makeApiBody(body: SwaggerBody): MethodDecorator {
    return ApiBody(body);
  }

  /**
   * Make @ApiResponse() decorators
   * @param {SwaggerResponse} response
   * @returns {MethodDecorator}
   */
  private makeApiResponse(response: SwaggerResponse): MethodDecorator {
    if (!response.description) {
      response.description = STATUS_CODES[response.status];
    }
    return ApiResponse(response as ApiResponseOptions);
  }

  /**
   * Automatically make default api response decorators
   *
   * You can add and remove response decorators
   * by calling add() and remove() methods.
   *
   * @param {any} returnType - Return type if the request is successful
   */
  private makeDefaultApiResponses(returnType?: any): void {
    this.response.set(
      200,
      this.makeApiResponse({ status: 200, type: returnType }),
    );
    this.response.set(401, this.makeApiResponse({ status: 401 }));
    this.response.set(403, this.makeApiResponse({ status: 403 }));
    this.response.set(404, this.makeApiResponse({ status: 404 }));
    this.response.set(500, this.makeApiResponse({ status: 500 }));
  }
}
