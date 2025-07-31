import { TasksRepository } from './tasks.repository';
import { PrismaService } from 'src/database/prisma.service';

describe('TasksRepository', () => {
  let repository: TasksRepository;
  let prisma: any;

  beforeEach(() => {
    prisma = {
      task: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        deleteMany: jest.fn(),
      },
    };

    repository = new TasksRepository(prisma);
  });

  it('should call prisma to create a task', async () => {
    const dto = { title: 't', description: 'd', clientId: 1, status: 'PENDING', priority: 'LOW', dueDate: new Date().toISOString() };
    await repository.create(dto as any, 1);
    expect(prisma.task.create).toHaveBeenCalled();
  });

  it('should call prisma to find tasks by userId', async () => {
    await repository.findAll(1);
    expect(prisma.task.findMany).toHaveBeenCalledWith({ where: { userId: 1 }, include: { client: true } });
  });
});