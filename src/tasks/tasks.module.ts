import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './tasks.repository';
import { PrismaService } from 'src/database/prisma.service';
import { ClientsRepository } from 'src/clients/clients.repository';

@Module({
  controllers: [TasksController],
  providers: [TasksService, TasksRepository, PrismaService, ClientsRepository],
})
export class TasksModule {}