import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { CreateTaskDto, UpdateTaskDto } from './dto/tasks.dto';
import { ClientsRepository } from 'src/clients/clients.repository';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepo: TasksRepository, private readonly clientsRepo: ClientsRepository) {}

  async create(dto: CreateTaskDto, userId: number) {

    const clientExists = await this.clientsRepo.findOne(dto.clientId);

    if (!clientExists) {
      throw new NotFoundException(`Client with ID ${dto.clientId} does not exist`);
    }

    if (clientExists.userId !== userId) {
      throw new UnauthorizedException(`You do not have permission to create tasks for this client`);
    }

    return this.tasksRepo.create(dto, userId);
  }

  findAll(userId: number) {
    return this.tasksRepo.findAll(userId);
  }

  async findOne(id: number, userId: number) {
    const task = await this.tasksRepo.findById(id);

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    if (task.userId !== userId) {
      throw new UnauthorizedException(`You do not have permission to access this task`);
    }

    return task
  }

  // async update(id: number, dto: UpdateTaskDto, userId: number) {
  //   const foundTask = await this.tasksRepo.findById(id);
    
  //   if (!foundTask) {
  //     throw new NotFoundException(`Task with ID ${id} not found`);
  //   }

  //   if (userId !== foundTask.userId) {
  //     throw new UnauthorizedException(`You do not have permission to update this task`);
  //   }

  //   return []
  // }

  delete(id: number) {
    return this.tasksRepo.delete(id);
  }
}
