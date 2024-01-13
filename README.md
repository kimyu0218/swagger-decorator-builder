## Swagger Decorator Builder 🛠️

![npm](https://img.shields.io/npm/v/@kimyu0218/swagger-decorator-builder) ![npm](https://img.shields.io/npm/dt/%40kimyu0218%2Fswagger-decorator-builder)

### Installation ⬇️

```bash
npm i @kimyu0218/swagger-decorator-builder
```

### Introduction 👀

This project is a Swagger Decorator Builder designed to **simplify the creation of Swagger decorators for API documentation**.

The existing Swagger decorators often result in lengthy code, impacting readability. In response to this issue, I initiated this project to create custom decorators using a **builder pattern**, aiming for more concise and efficient decorator composition.

```ts
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
```

### How to Use ❓

1. Import `SwaggerDecoratorBuilder` class.

```ts
import { SwaggerDecoratorBuilder } from '@kimyu0218/swagger-decorator-builder';
```

2. Pass `target`, `method` parameters to the constructor. The builder will automatically create a summary of `@ApiOperation()` decorator. If you want to put a `returnType` in `@ApiOkResponse()`, you can optionally hand over the `returnType`!

```ts
new SwaggerDecoratorBuilder(target, 'GET', returnType) ...
```

3. If needed, use the `addParam` and `setBody` methods to add `@ApiParam()` and `@ApiBody()` decorators.

```ts
new SwaggerDecoratorBuilder(target, 'PATCH').addParam(param).setBody(body) ...
```

4. Use the `addResponse` method to set additional API response decorators. (By default, responses for status codes 200, 401, 403, 404, and 500 are generated.) You can also remove default responses by `remove` method.

```ts
new SwaggerDecoratorBuilder(target, 'POST')
  .setBody(body)
  .removeResponse(200)
  .removeResponse(403)
  .removeResponse(404)
  .addResponse({ status: 201, description: 'create cat' }) ...
```

5. Call the `build` method to get the final decorator!!

```ts
new SwaggerDecoratorBuilder(target, 'GET', returnType)
  .removeResponse(401)
  .removeResponse(403)
  .removeResponse(404)
  .build();
```

### Conclusion ✨

The Swagger Decorator Builder facilitates the creation of **concise and readable API documentation**.

The introduction of the builder pattern streamlines code writing, making API documentation management more efficient. Through this project, users can write cleaner code and effectively manage API documentation.

```ts
@Patch(':id')
@UpdateCatDecorator(
  'Cat',
  { type: 'uuid', name: 'id', description: 'identifier of cat' },
  { type: UpdateCatDto, description: 'update dto of cat' },
)
update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {}
```

### Ongoing Development 🏃

It's important to note that this project is **still in development**. My goal is to align with and enhance the Swagger decorators based on the official Swagger documentation.

[[KR] 나는 왜 Swagger Decorator Builder를 만들었을까?](https://github.com/kimyu0218/swagger-decorator-builder/wiki/%EB%82%98%EB%8A%94-%EC%99%9C-Swagger-Decorator-Builder%EB%A5%BC-%EB%A7%8C%EB%93%A4%EC%97%88%EC%9D%84%EA%B9%8C%3F)
