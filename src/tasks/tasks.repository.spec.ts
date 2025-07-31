import { Test, TestingModule } from '@nestjs/testing';
import { TasksRepository } from './tasks.repository';
import { PrismaService } from 'src/database/prisma.service';

describe('Repository', () => {
  let provider: TasksRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const mockPrismaService = {
      task: {
        create: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),  
        deleteAllByUserId: jest.fn(),
        findAllByClientId: jest.fn(),
        deleteAllByClientId: jest.fn(),     
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksRepository, {
        provide: PrismaService,
        useValue: mockPrismaService,
      }],
    }).compile();

    provider = module.get<TasksRepository>(TasksRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
