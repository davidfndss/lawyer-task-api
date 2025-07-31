import { Test, TestingModule } from '@nestjs/testing';
import { ClientsRepository } from './clients.repository';
import { PrismaService } from 'src/database/prisma.service';

describe('Repository', () => {
  let provider: ClientsRepository;

  beforeEach(async () => {
    const mockPrismaService = {
      client: {
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientsRepository, {
        provide: PrismaService,
        useValue: mockPrismaService,
      }],
    }).compile();

    provider = module.get<ClientsRepository>(ClientsRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
