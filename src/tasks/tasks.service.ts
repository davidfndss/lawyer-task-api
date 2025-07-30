import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { CreateTaskDto, UpdateTaskDto } from './dto/tasks.dto';
import { ClientsService } from 'src/clients/clients.service';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepo: TasksRepository, 
    @Inject(forwardRef(() => ClientsService))
    private readonly clientsService: ClientsService) {}

  async create(dto: CreateTaskDto, userId: number) {

    const clientExists = await this.clientsService.findOne(dto.clientId, userId);

    if (!clientExists) {
      throw new NotFoundException(`Client with ID ${dto.clientId} does not exist`);
    }

    if (clientExists.userId !== userId) {
      throw new UnauthorizedException(`You do not have permission to create tasks for this client`);
    }

    const createdTask = await this.tasksRepo.create(dto, userId);

    return { message: 'Task created successfully', ...createdTask };
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

    return { message: 'Task found successfully!', ...task };
  }

  async update(id: number, dto: UpdateTaskDto, userId: number) {
    // Validations sequence:
    // 1. Check if the task exists.
    // 2. Check if the user has permission to update the task.
    // 3. Check if the user sent at least one field to update.
    // 4. If clientId is provided, check if the client exists and belongs to the user.
    // 5. If clientId is provided, check if the user has permission to create tasks for this client.

    const foundTask = await this.tasksRepo.findById(id);
    
    if (!foundTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    if (userId !== foundTask.userId) {
      throw new UnauthorizedException(`You do not have permission to update this task`);
    }

    if (!dto.title && !dto.description && !dto.clientId && !dto.status && !dto.priority && !dto.dueDate) {
      throw new BadRequestException('You must provide at least one field to update');
    }

    if (dto.clientId) {
      const clientExists = await this.clientsService.findOne(dto.clientId, userId);

      if (!clientExists) {
        throw new NotFoundException(`Client with ID ${dto.clientId} does not exist`);
      }

      if (clientExists.userId !== userId) {
        throw new UnauthorizedException(`You do not have permission to create tasks for this client`);
      }
    }

    const taskUpdated = await this.tasksRepo.update(id, dto);

    return { message: 'Task updated successfully', ...taskUpdated };
  }

  async delete(id: number, userId: number) {
    const task = await this.tasksRepo.findById(id);

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    if (task.userId !== userId) {
      throw new UnauthorizedException(`You do not have permission to access this task`);
    }

    await this.tasksRepo.delete(id);

    return { message: 'Task deleted successfully' };
  }

  async deleteAllByUserId(userId: number) {
    try {
      await this.tasksRepo.deleteAllByUserId(userId);
    } catch (error) {
      console.error(`Error deleting tasks for user with ID ${userId}, error: ${error}`);
    }
  }

  async deleteAllByClientId(clientId: number) {
    try {
      await this.tasksRepo.deleteAllByClientId(clientId);
    } catch (error) {
      console.error(`Error deleting tasks for client with ID ${clientId}, error: ${error}`);
    }
  }
}
