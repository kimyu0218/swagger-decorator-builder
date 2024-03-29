import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiBodyOptions,
  ApiOperation,
  ApiOperationOptions,
  ApiParam,
  ApiParamOptions,
  ApiQuery,
  ApiQueryOptions,
  ApiResponse,
  ApiResponseOptions,
} from '@nestjs/swagger';
import { STATUS_CODES } from 'http';
import { HttpMethods, SwaggerHttpStatus } from './types';

/**
 * Builder class for creating Swagger decorators in NestJS applications.
 * Allows the construction of decorators
 * such as ApiOperation, ApiBody, ApiParam, ApiQuery, and ApiResponse
 * with flexibility to add, remove, and customize responses.
 */
export class SwaggerDecoratorBuilder {
  private body?: MethodDecorator;
  private operation?: MethodDecorator;
  private params?: MethodDecorator[] = [];
  private queries?: MethodDecorator[] = [];
  private responses?: Map<SwaggerHttpStatus, MethodDecorator> = new Map<
    SwaggerHttpStatus,
    MethodDecorator
  >();

  constructor(target?: string, method?: HttpMethods, returnType?: any) {
    if (target && method) {
      this.operation = this.makeDefaultApiOperation(target, method);
    }
    this.makeDefaultApiResponses(returnType);
    return this;
  }

  /**
   * Add the @ApiParam decorator.
   * @param {ApiParamOptions} param - The Swagger param configuration.
   * @returns {this}
   */
  addParam(param: ApiParamOptions): this {
    this.params.push(this.makeApiParam(param));
    return this;
  }

  /**
   * Add the @ApiQuery decorator.
   * @param {ApiQueryOptions} query - The Swagger query configuration.
   * @returns {this}
   */
  addQuery(query: ApiQueryOptions): this {
    this.queries.push(this.makeApiQuery(query));
    return this;
  }

  /**
   * Add or revise API response.
   * @param {number | ApiResponseOptions} response - The HTTP status code or Swagger response configuration.
   * @returns {this}
   */
  addResponse(response: number | ApiResponseOptions): this {
    if (typeof response === 'number') {
      this.responses.set(response, this.makeApiResponse({ status: response }));
      return this;
    }
    this.responses.set(response.status, this.makeApiResponse(response));
    return this;
  }

  /**
   * Remove API response.
   * @param {SwaggerHttpStatus} status - HTTP response status code.
   * @returns {this}
   */
  removeResponse(status: SwaggerHttpStatus): this {
    this.responses.delete(status);
    return this;
  }

  /**
   * Build and return a custom decorator using the configured decorators.
   * @returns {MethodDecorator} - a custom decorator.
   */
  build(): MethodDecorator {
    const decorators: MethodDecorator[] = [];
    if (this.body) {
      decorators.push(this.body);
    }
    if (this.operation) {
      decorators.push(this.operation);
    }
    this.params.forEach((apiParam: MethodDecorator) =>
      decorators.push(apiParam),
    );
    this.queries.forEach((apiQuery: MethodDecorator) =>
      decorators.push(apiQuery),
    );
    this.responses.forEach((apiResponse: MethodDecorator) =>
      decorators.push(apiResponse),
    );
    return applyDecorators(...decorators);
  }

  /**
   * Set the @ApiBody decorator.
   * @param {ApiBodyOptions} body - The Swagger body configuration.
   * @returns {this}
   */
  setBody(body: ApiBodyOptions): this {
    this.body = this.makeApiBody(body);
    return this;
  }

  /**
   * Set the @ApiOperation decorator.
   * @param {ApiOperationOptions} operation - The Swagger operation configuration.
   * @returns {this}
   */
  setOperation(operation: ApiOperationOptions): this {
    this.makeApiOperation(operation);
    return this;
  }

  /**
   * Make the @ApiBody decorator.
   * @param {ApiBodyOptions} body - The Swagger body configuration.
   * @returns {MethodDecorator} - The generated @ApiBody decorator.
   */
  private makeApiBody(body: ApiBodyOptions): MethodDecorator {
    return ApiBody(body);
  }

  /**
   * Make the @ApiOperation decorator.
   * @param {ApiOperationOptions} operation - The Swagger operation configuration.
   * @returns {MethodDecorator} - The generated @ApiOperation decorator.
   */
  private makeApiOperation(operation: ApiOperationOptions): MethodDecorator {
    return ApiOperation(operation);
  }

  /**
   * Make the @ApiParam decorator.
   * @param {ApiParamOptions} param - The Swagger param configuration.
   * @returns {MethodDecorator} - The generated @ApiParam decorator.
   */
  private makeApiParam(param: ApiParamOptions): MethodDecorator {
    return ApiParam(param);
  }

  /**
   * Make the @ApiQuery decorator.
   * @param {ApiQueryOptions} query - The Swagger query configuration.
   * @returns {MethodDecorator} - The generated @ApiQuery decorator.
   */
  private makeApiQuery(query: ApiQueryOptions): MethodDecorator {
    return ApiQuery(query);
  }

  /**
   * Make the @ApiResponse decorator.
   * @param {ApiResponseOptions} response - The Swagger response configuration.
   * @returns {MethodDecorator} - The generated @ApiResponse decorator.
   */
  private makeApiResponse(response: ApiResponseOptions): MethodDecorator {
    if (!response.description && typeof response.status === 'number') {
      response.description = STATUS_CODES[response.status];
    }
    return ApiResponse(response as ApiResponseOptions);
  }

  /**
   * Automatically make the default @ApiOperation decorator.
   * @param {string} target - The target resquested by the client.
   * @param {HttpMethods} method - The HTTP method requested by the client.
   * @returns {MethodDecorator} - The generated @ApiOperation decorator.
   */
  private makeDefaultApiOperation(
    target: string,
    method: HttpMethods,
  ): MethodDecorator {
    return ApiOperation({ summary: `${method} ${target}` });
  }

  /**
   * Automatically make the default @ApiResponse decorators.
   * You can add and remove response decorators by using add() and remove() methods.
   * @param {any} returnType - The return type when the HTTP status code is 200.
   */
  private makeDefaultApiResponses(returnType?: any): void {
    this.responses.set(
      200,
      this.makeApiResponse({ status: 200, type: returnType }),
    );
    this.responses.set(401, this.makeApiResponse({ status: 401 }));
    this.responses.set(403, this.makeApiResponse({ status: 403 }));
    this.responses.set(404, this.makeApiResponse({ status: 404 }));
    this.responses.set(500, this.makeApiResponse({ status: 500 }));
  }
}
