import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;
  let tasksService: TasksService;

  const mockTasksService = {
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.create with correct params', async () => {
    const dto = { title: 'Test', description: 'Test', clientId: 1, status: 'PENDING', priority: 'LOW', dueDate: new Date().toISOString() };
    const req = { user: { id: 1 } };
    mockTasksService.create.mockResolvedValue({ message: 'ok' });

    await controller.create(dto as any, req);
    expect(mockTasksService.create).toHaveBeenCalledWith(dto, 1);
  });

  it('should call service.findAll with userId', async () => {
    const req = { user: { id: 1 } };
    mockTasksService.findAll.mockResolvedValue([]);

    const result = await controller.findAll(req);
    expect(mockTasksService.findAll).toHaveBeenCalledWith(1);
    expect(result).toEqual([]);
  });

});
