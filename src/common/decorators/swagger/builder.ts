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
   * @param {SwaggerResponse} response
   * @returns {SwaggerDecoratorBuilder}
   */
  add(response: SwaggerResponse): SwaggerDecoratorBuilder {
    this.response.set(response.status, this.makeApiResponse(response));
    return this;
  }

  /**
   * Remove Api Response
   * @param {ResponseStatus} status - Http Response Status
   * @returns {SwaggerDecoratorBuilder}
   */
  remove(status: ResponseStatus): SwaggerDecoratorBuilder {
    this.response.delete(status);
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
   * @param {SwaggerParam} param
   * @returns {MethodDecorator}
   */
  private makeApiParam(param: SwaggerParam): MethodDecorator {
    return ApiParam(param);
  }

  /**
   * Make @ApiBody() Decorator
   * @param {SwaggerBody} body
   * @returns {MethodDecorator}
   */
  private makeApiBody(body: SwaggerBody): MethodDecorator {
    return ApiBody(body);
  }

  /**
   * Make Api Response Decorators
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
   * Automatically Make Default Api Response Decorators
   * You can add and remove response decorators
   * by calling add() and remove() methods.
   *
   * @param {any} returnType - Return Type if the request is successful
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
