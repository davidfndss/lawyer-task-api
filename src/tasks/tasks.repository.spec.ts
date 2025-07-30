import { Test, TestingModule } from '@nestjs/testing';
import { TaskRepository } from './tasks.repository';

describe('Repository', () => {
  let provider: TaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskRepository],
    }).compile();

    provider = module.get<TaskRepository>(TaskRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
