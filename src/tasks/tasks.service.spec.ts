import { TasksService } from './tasks.service';
import { NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { TaskStatus } from 'generated/prisma/client';
import { TaskPriority } from 'generated/prisma';

describe('TasksService', () => {
  let service: TasksService;
  let tasksRepo: any;
  let clientsService: any;

  beforeEach(async () => {
    tasksRepo = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    clientsService = {
      findOne: jest.fn(),
    };

    service = new TasksService(tasksRepo, clientsService);
  });

  describe('create', () => {
    it('should create a task when client exists and belongs to user', async () => {
      clientsService.findOne.mockResolvedValue({ id: 1, userId: 1 });
      tasksRepo.create.mockResolvedValue({ id: 1 });

      const dto = {
        title: 'Task',
        description: 'Test',
        status: TaskStatus.todo,
        priority: TaskPriority.low,
        dueDate: new Date().toISOString(),
        clientId: 1,
      };

      const result = await service.create(dto, 1);

      expect(result.message).toBe('Task created successfully');
      expect(tasksRepo.create).toHaveBeenCalled();
    });

    it('should throw if client does not exist', async () => {
      clientsService.findOne.mockResolvedValue(null);

      await expect(
        service.create({ ...{} as any, clientId: 99 }, 1),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw if client belongs to another user', async () => {
      clientsService.findOne.mockResolvedValue({ userId: 2 });

      await expect(
        service.create({ ...{} as any, clientId: 1 }, 1),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('update', () => {
    it('should throw if no fields are provided', async () => {
      tasksRepo.findById.mockResolvedValue({ id: 1, userId: 1 });

      await expect(
        service.update(1, {} as any, 1),
      ).rejects.toThrow(BadRequestException);
    });
  });
});