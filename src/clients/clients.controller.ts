import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto, UpdateClientDto } from './dto/clients.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/clients')
@UseGuards(JwtAuthGuard)
export class ClientsController {
  constructor(private readonly clientService: ClientsService) {}

  @HttpCode(201)
  @Post()
  create(@Body() dto: CreateClientDto, @Request() req) {
    return this.clientService.create(dto, req.user.id);
  }

  @Get()
  findAll(@Request() req) {
    return this.clientService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.clientService.findOne(+id, req.user.id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateClientDto, @Request() req) {
    return this.clientService.update(+id, dto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.clientService.remove(+id, req.user.id);
  }
}
