import { forwardRef, Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { ClientsRepository } from './clients.repository';
import { PrismaService } from 'src/database/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtStrategy } from '../auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    forwardRef(() => TasksModule),
  ],
  controllers: [ClientsController],
  providers: [ClientsService, ClientsRepository, PrismaService, JwtAuthGuard, JwtStrategy],
  exports: [ClientsService],
})
export class ClientsModule {}