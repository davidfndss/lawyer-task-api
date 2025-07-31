import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { ClientsRepository } from './clients.repository';
import { TasksService } from 'src/tasks/tasks.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('ClientsService', () => {
  let service: ClientsService;
  let clientsRepo: ClientsRepository;
  let tasksService: TasksService;

  const mockClientsRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    deleteAllByUserId: jest.fn(),
  };

  const mockTasksService = {
    deleteAllByClientId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        { provide: ClientsRepository, useValue: mockClientsRepository },
        { provide: TasksService, useValue: mockTasksService },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
    clientsRepo = module.get<ClientsRepository>(ClientsRepository);
    tasksService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should throw NotFoundException if client is not found', async () => {
      mockClientsRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(1, 1)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if user does not own the client', async () => {
      mockClientsRepository.findOne.mockResolvedValue({ id: 1, userId: 2 });

      await expect(service.findOne(1, 1)).rejects.toThrow(NotFoundException);
    });

    it('should return client if found and authorized', async () => {
      const client = { id: 1, userId: 1 };
      mockClientsRepository.findOne.mockResolvedValue(client);

      const result = await service.findOne(1, 1);
      expect(result).toEqual(client);
    });
  });

  describe('update', () => {
    it('should throw NotFoundException if client is not found', async () => {
      mockClientsRepository.findOne.mockResolvedValue(null);

      await expect(service.update(1, {}, 1)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if user is not authorized', async () => {
      mockClientsRepository.findOne.mockResolvedValue({ id: 1, userId: 2 });

      await expect(service.update(1, {}, 1)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if no fields are provided', async () => {
      mockClientsRepository.findOne.mockResolvedValue({ id: 1, userId: 1 });

      await expect(service.update(1, {}, 1)).rejects.toThrow(BadRequestException);
    });

    it('should update client if valid', async () => {
      mockClientsRepository.findOne.mockResolvedValue({ id: 1, userId: 1 });

      const dto = { name: 'Updated' };
      const result = await service.update(1, dto, 1);
      expect(result).toEqual({ message: 'Client updated successfully' });
      expect(mockClientsRepository.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('should throw NotFoundException if client not found', async () => {
      mockClientsRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(1, 1)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if user is not authorized', async () => {
      mockClientsRepository.findOne.mockResolvedValue({ id: 1, userId: 2 });

      await expect(service.remove(1, 1)).rejects.toThrow(NotFoundException);
    });

    it('should delete client and its tasks', async () => {
      const client = { id: 1, userId: 1 };
      mockClientsRepository.findOne.mockResolvedValue(client);

      const result = await service.remove(1, 1);
      expect(mockTasksService.deleteAllByClientId).toHaveBeenCalledWith(1);
      expect(mockClientsRepository.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual({ message: 'Client deleted successfully' });
    });
  });
});