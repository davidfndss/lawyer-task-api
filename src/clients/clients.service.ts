import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientsRepository } from './clients.repository';
import { CreateClientDto, UpdateClientDto } from './dto/clients.dto';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class ClientsService {
  constructor(private readonly clientsRepo: ClientsRepository, 
    @Inject(forwardRef(() => TasksService))
    private readonly tasksService: TasksService) {}

  create(dto: CreateClientDto, userId: number) {
    return this.clientsRepo.create(dto, userId);
  }

  findAll(userId: number) {
    return this.clientsRepo.findAll(userId);
  }

  async findOne(id: number, userId: number) {
    const clientFound = await this.clientsRepo.findOne(id);

    if (!clientFound) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    if (clientFound.userId !== userId) {
      throw new NotFoundException(
        `You do not have permission to access this client`,
      );
    }

    return clientFound;
  }

  async update(id: number, dto: UpdateClientDto, userId: number) {
    // Validations sequence:
    // 1. Check if the Client exist.
    // 2. Check if the user has permission to update the Cliet.
    // 3. Check if the user sent at least one field to update.

    const clientFound = await this.clientsRepo.findOne(id);

    if (!clientFound) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    if ( clientFound.userId !== userId) {
      throw new NotFoundException(`You do not have permission to update this client`);
    }

    if (!dto.name && !dto.email && !dto.phone) {
      throw new BadRequestException(`At least one field must be provided to update the client`);
    }

    await this.clientsRepo.update(id, dto);

    return { message: 'Client updated successfully' };
  }

  async remove(id: number, userId: number) {

    const clientFound = await this.clientsRepo.findOne(id);

    if (!clientFound) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    
    if (clientFound.userId !== userId) {
      throw new NotFoundException(`You do not have permission to delete this client`);
    }

    await this.tasksService.deleteAllByClientId(id);
    await this.clientsRepo.remove(id);

    return { message: 'Client deleted successfully' };
  }

  async deleteAllByUserId(userId: number) {
    return this.clientsRepo.deleteAllByUserId(userId);
  }
}
