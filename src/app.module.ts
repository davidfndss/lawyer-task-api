import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [TasksModule, AuthModule, UserModule, ClientsModule],
})
export class AppModule {}