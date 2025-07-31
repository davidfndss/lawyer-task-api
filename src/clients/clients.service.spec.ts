import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { ClientsRepository } from './clients.repository';
import { TasksService } from 'src/tasks/tasks.service';

describe('ClientsService', () => {
  let service: ClientsService;

  beforeEach(async () => {
    let mockClientsRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const mockTasksService = {
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientsService, { provide: ClientsRepository, useValue: mockClientsRepository }, { provide: TasksService, useValue: mockTasksService }],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
