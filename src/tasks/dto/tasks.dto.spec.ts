import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';
import { TaskPriority, TaskStatus } from 'generated/prisma/client';

describe('CreateTaskDto', () => {
  it('should validate a correct DTO', async () => {
    const dto = plainToInstance(CreateTaskDto, {
      title: 'Test Task',
      description: 'Testing validation',
      status: TaskStatus.todo,
      priority: TaskPriority.medium,
      dueDate: new Date().toISOString(),
      clientId: 1,
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should return errors for empty fields', async () => {
    const dto = plainToInstance(CreateTaskDto, {});

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});

describe('UpdateTaskDto', () => {
  it('should allow partial updates', async () => {
    const dto = plainToInstance(UpdateTaskDto, {
      title: 'Updated title',
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
