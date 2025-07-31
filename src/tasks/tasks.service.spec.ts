import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { ClientsService } from 'src/clients/clients.service';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const mockTasksRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const mockClientsService = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService, { provide: TasksRepository, useValue: mockTasksRepository }, { provide: ClientsService, useValue: mockClientsService }],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
