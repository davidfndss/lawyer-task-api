import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PrismaService } from 'src/database/prisma.service';
import { TasksModule } from 'src/tasks/tasks.module';
import { ClientsModule } from 'src/clients/clients.module';

@Module({
  imports: [TasksModule, ClientsModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService],
})
export class UserModule {}
