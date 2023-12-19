import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateCatDecorator,
  DeleteCatDecorator,
  FindAllCatsDecorator,
  FindCatDecorator,
  UpdateCatDecorator,
} from './cats.decorator';
import { CreateCatDto } from './dto/create-cat.dto';
import { FindCatDto } from './dto/find-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
@ApiTags('🐱 cat')
export class CatsController {
  @Post()
  @CreateCatDecorator('Cat', {
    type: CreateCatDto,
    description: 'create dto of cat',
  })
  create(@Body() createCatDto: CreateCatDto) {}

  @Get()
  @FindAllCatsDecorator('Cats', [FindCatDto])
  findAll() {}

  @Get(':id')
  @FindCatDecorator(
    'Cat',
    { type: 'uuid', name: 'id', description: 'identifier of cat' },
    FindCatDto,
  )
  findOne(@Param('id') id: string) {}

  @Patch(':id')
  @UpdateCatDecorator(
    'Cat',
    { type: 'uuid', name: 'id', description: 'identifier of cat' },
    { type: UpdateCatDto, description: 'update dto of cat' },
  )
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {}

  @Delete(':id')
  @DeleteCatDecorator('Cat', {
    type: 'uuid',
    name: 'id',
    description: 'identifier of cat',
  })
  remove(@Param('id') id: string) {}
}
