import { Test, TestingModule } from '@nestjs/testing';
import { ClientsRepository } from './clients.repository';
import { PrismaService } from 'src/database/prisma.service';

describe('ClientsRepository', () => {
  let repository: ClientsRepository;
  let prismaMock: any;

  beforeEach(async () => {
    prismaMock = {
      client: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        deleteMany: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsRepository,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    repository = module.get<ClientsRepository>(ClientsRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should call findOne', async () => {
    prismaMock.client.findUnique.mockResolvedValue({ id: 1 });
    const result = await repository.findOne(1);
    expect(result).toEqual({ id: 1 });
  });
});