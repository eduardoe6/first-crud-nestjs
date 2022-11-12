import {
  Controller,
  Post,
  Put,
  Delete,
  Get,
  Body,
  Param,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonModel } from 'src/models/person.model';
import { PersonSchema } from 'src/schemas/person.schema';
@Controller('/person')
export class PersonController {
  constructor(
    @InjectRepository(PersonModel) private model: Repository<PersonModel>,
  ) {}

  @Get(':id')
  public async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PersonModel> {
    const person = await this.model.findOne({ where: { id } });

    if (!person) throw new NotFoundException();

    return person;
  }

  @Get()
  public async getAll(): Promise<PersonModel[]> {
    return await this.model.find();
  }

  @Post()
  public async create(@Body() body: PersonSchema): Promise<PersonModel> {
    return await this.model.save(body);
  }

  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PersonSchema,
  ): Promise<PersonModel> {
    const person = await this.model.findOne({ where: { id } });

    if (!person) throw new NotFoundException();

    await this.model.update({ id }, body);

    return await this.model.findOne({ where: { id } });
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const person = await this.model.findOne({ where: { id } });

    if (!person) throw new NotFoundException();

    await this.model.delete(id);

    return `A pessoa com id ${id} foi deletada com sucesso!`;
  }
}
