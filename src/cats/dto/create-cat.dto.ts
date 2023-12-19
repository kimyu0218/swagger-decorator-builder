import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiProperty({ description: 'name of cat', required: true })
  name: string;

  @ApiProperty({ description: 'age of cat', required: true })
  age: number;
}
