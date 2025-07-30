import { forwardRef, Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './tasks.repository';
import { PrismaService } from 'src/database/prisma.service';
import { ClientsModule } from 'src/clients/clients.module';

@Module({
  imports: [forwardRef(() => ClientsModule)],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository, PrismaService],
  exports: [TasksService],
})
export class TasksModule {}