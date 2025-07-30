import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateClientDto, UpdateClientDto } from './dto/clients.dto';

@Injectable()
export class ClientsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateClientDto, userId: number) {
    return this.prisma.client.create({ data: { ...dto, userId} });
  }

  findAll(userId: number) {
    return this.prisma.client.findMany({ where: { userId } });
  }

  findOne(id: number) {
    return this.prisma.client.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateClientDto) {
    return this.prisma.client.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.client.delete({ where: { id } });
  }

  deleteAllByUserId(userId: number) {
    return this.prisma.client.deleteMany({ where: { userId } });
  }
}