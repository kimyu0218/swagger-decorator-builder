## Swagger Decorator Builder 🛠️

### Introduction

This project is a Swagger Decorator Builder designed to **simplify the creation of Swagger decorators for API documentation**. 

The existing Swagger decorators often result in lengthy code, impacting readability. In response to this issue, I initiated this project to create custom decorators using a **builder pattern**, aiming for more concise and efficient decorator composition.

```ts
// src/cats/cats.decorator.ts

export const FindAllCatsDecorator = (target: string, returnType: any) =>
  new SwaggerDecoratorBuilder(target, 'GET', returnType)
    .remove(401)
    .remove(403)
    .remove(404)
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
```

### Conclusion

The Swagger Decorator Builder facilitates the creation of **concise and readable API documentation**. 

The introduction of the builder pattern streamlines code writing, making API documentation management more efficient. Through this project, users can write cleaner code and effectively manage API documentation.

<br>

### Ongoing Development

It's important to note that this project is **still in development**. My goal is to align with and enhance the Swagger decorators based on the official Swagger documentation.
