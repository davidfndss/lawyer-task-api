import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request, HttpCode } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/tasks.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @HttpCode(201)
  @Post()
  create(@Body() dto: CreateTaskDto, @Request() req) {
    return this.tasksService.create(dto, req.user.id);
  }

  @Get()
  findAll(@Request() req) {
    return this.tasksService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.tasksService.findOne(+id, req.user.id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto, @Request() req) {
    return this.tasksService.update(+id, dto, req.user.id);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Request() req) {
    return this.tasksService.delete(+id, req.user.id);
  }
}
