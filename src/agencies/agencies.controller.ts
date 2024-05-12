import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';

@Controller('agencies')
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) { }


  @Post()
  create(@Body() createAgencyDto: CreateAgencyDto) {
    return this.agenciesService.create(createAgencyDto);
  }


  @Get()
  findAll() {
    return this.agenciesService.findAll();
  }


  @Get('/pordepartamento/:userId')
  findAllPorDep(@Param('userId') userId: number) {
    return this.agenciesService.findAllPorDep(+userId);
  }


  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.agenciesService.findOne(+id);
  }


  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateAgencyDto: UpdateAgencyDto,
  ) {
    return this.agenciesService.update(+id, updateAgencyDto);
  }


  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.agenciesService.remove(+id);
  }
}
