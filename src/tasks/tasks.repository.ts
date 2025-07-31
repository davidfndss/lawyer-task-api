import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/tasks.dto';

@Injectable()
export class TasksRepository {
  constructor(private prisma: PrismaService) {}

  create(data: CreateTaskDto, userId: number) {
    return this.prisma.task.create({
      data: { ...data, userId },
    });
  }

  findAll(userId: number) {
    return this.prisma.task.findMany({
      where: { userId }, 
      include: { client: true },
    });
  }

  findById(id: number) {
    return this.prisma.task.findUnique({ where: { id }, include: { client: true } });
  }

  update(id: number, data: UpdateTaskDto) {
    return this.prisma.task.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.task.delete({ where: { id } });
  }

  deleteAllByUserId(userId: number) {
    return this.prisma.task.deleteMany({ where: { userId } });
  }

  findAllByClientId(clientId: number) {
    return this.prisma.task.findMany({
      where: { clientId },
    });
  }

  deleteAllByClientId(clientId: number) {
    return this.prisma.task.deleteMany({
      where: { clientId },
    });
  }
}