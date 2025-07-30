import { Test, TestingModule } from '@nestjs/testing';
import { ClientsRepository } from './clients.repository';

describe('Repository', () => {
  let provider: ClientsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientsRepository],
    }).compile();

    provider = module.get<ClientsRepository>(ClientsRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
