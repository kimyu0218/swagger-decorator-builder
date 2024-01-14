## Swagger Decorator Builder 🛠️

![npm](https://img.shields.io/npm/v/@kimyu0218/swagger-decorator-builder) ![npm](https://img.shields.io/npm/dt/@kimyu0218/swagger-decorator-builder)

<br>

### Installation ⬇️

```bash
npm i @kimyu0218/swagger-decorator-builder
```

<br>

### Introduction 👀

This project is a Swagger Decorator Builder designed to **simplify the creation of Swagger decorators for API documentation**.

The existing Swagger decorators often result in lengthy code, impacting readability. In response to this issue, I initiated this project to create custom decorators using a **builder pattern**, aiming for more concise and efficient decorator composition.

```ts
export const FindAllCatsDecorator = (target: string, returnType: any) =>
  new SwaggerDecoratorBuilder(target, 'GET', returnType) // Automatically set API operation summary. (target: 'cats' -> GET cats)
    .removeResponse(401) // Remove the default 401 API response.
    .removeResponse(403) // Remove the default 403 API response.
    .removeResponse(404) // Remove the default 404 API response.
    .build();

export const UpdateCatDecorator = (
  target: string,
  param: ApiParamOptions,
  body: ApiBodyOptions,
) =>
  new SwaggerDecoratorBuilder(target, 'PATCH') // Automatically set API operation summary. (target: 'cat' -> PATCH cat)
    .addParam(param) // Set the request param.
    .setBody(body) // Set the request body.
    .addResponse({ status: 403, description: 'Forbidden - Unauthorized User' }) // Overwrite the default 403 API response.
    .build();
```

<br>

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

<br>

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

<br>

### Ongoing Development 🏃

It's important to note that this project is **still in development**. My goal is to align with and enhance the Swagger decorators based on the official Swagger documentation.

[[KR] 나는 왜 Swagger Decorator Builder를 만들었을까?](https://github.com/kimyu0218/swagger-decorator-builder/wiki/%EB%82%98%EB%8A%94-%EC%99%9C-Swagger-Decorator-Builder%EB%A5%BC-%EB%A7%8C%EB%93%A4%EC%97%88%EC%9D%84%EA%B9%8C%3F)

[[KR] 누구나 사용할 수 있는 패키지를 만들자](https://github.com/kimyu0218/swagger-decorator-builder/wiki/%EB%88%84%EA%B5%AC%EB%82%98-%EC%82%AC%EC%9A%A9%ED%95%A0-%EC%88%98-%EC%9E%88%EB%8A%94-%ED%8C%A8%ED%82%A4%EC%A7%80%EB%A5%BC-%EB%A7%8C%EB%93%A4%EC%9E%90)
