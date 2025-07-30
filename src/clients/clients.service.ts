import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientsRepository } from './clients.repository';
import { CreateClientDto, UpdateClientDto } from './dto/clients.dto';

@Injectable()
export class ClientsService {
  constructor(private readonly clientsRepo: ClientsRepository) {}

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
      throw new NotFoundException(`You do not have permission to access this client`);
    }

    return clientFound;
  }

  update(id: number, dto: UpdateClientDto) {
    return this.clientsRepo.update(id, dto);
  }

  remove(id: number) {
    return this.clientsRepo.remove(id);
  }
}
