import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { TasksService } from 'src/tasks/tasks.service';
import { ClientsService } from 'src/clients/clients.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const mockUserRepository = {
      findOne: jest.fn(),
      findByEmail: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };
    const mockTasksService = {
      deleteAllByUserId: jest.fn(),
    };
    const mockClientsService = {
      deleteAllByUserId: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useValue: mockUserRepository },
        { provide: TasksService, useValue: mockTasksService },
        { provide: ClientsService, useValue: mockClientsService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});