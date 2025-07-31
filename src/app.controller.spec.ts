import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return a welcome message', () => {
      expect(appController.getWelcome()).toBe('Welcome to the LawyerTask API! This API provides endpoints for managing tasks, users, authentication, and clients. For more information, please refer to the API documentation. check the Swagger UI at /doc');
    });
  });
});
