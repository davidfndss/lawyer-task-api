import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ClientsModule } from './clients/clients.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TasksModule, AuthModule, UserModule, ClientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}