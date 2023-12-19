import { ApiProperty } from '@nestjs/swagger';

export class FindCatDto {
  @ApiProperty({ description: 'id of cat', required: true })
  id: string;

  @ApiProperty({ description: 'name of cat', required: true })
  name: string;

  @ApiProperty({ description: 'age of cat', required: true })
  age: number;
}
