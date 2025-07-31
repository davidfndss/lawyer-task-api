import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { TasksService } from 'src/tasks/tasks.service';
import { ClientsService } from 'src/clients/clients.service';
import { UnauthorizedException, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserService', () => {
  let service: UserService;
  let userRepo: any;

  beforeEach(async () => {
    userRepo = {
      findOne: jest.fn(),
      findByEmail: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useValue: userRepo },
        { provide: TasksService, useValue: {} },
        { provide: ClientsService, useValue: {} },
      ],
    }).compile(); 

    const tasksService = module.get<TasksService>(TasksService);
    const clientsService = module.get<ClientsService>(ClientsService);
    service = module.get<UserService>(UserService);
  });

  describe('findOne', () => {
    it('should throw UnauthorizedException if user tries to access another profile', async () => {
      await expect(service.findOne(1, 2)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      userRepo.findOne.mockResolvedValue(null);
      await expect(service.findOne(1, 1)).rejects.toThrow(NotFoundException);
    });

    it('should return user successfully when IDs match and user is found', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
        tasks: [],
      };

      userRepo.findOne.mockResolvedValue(mockUser);

      const result = await service.findOne(1, 1);

      expect(result.message).toBe('User found successfully!');
      expect(result.email).toBe(mockUser.email);
    });
  });

  describe('update', () => {
    it('should throw UnauthorizedException when user tries to update another profile', async () => {
      await expect(service.update(1, { email: 'test@example.com' }, 2)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw NotFoundException if the user does not exist', async () => {
      userRepo.findOne.mockResolvedValue(null);
      await expect(service.update(1, { email: 'test@example.com' }, 1)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if no fields are provided to update', async () => {
      userRepo.findOne.mockResolvedValue({ id: 1 });
      await expect(service.update(1, {}, 1)).rejects.toThrow(BadRequestException);
    });

    it('should throw ConflictException if new email already exists for another user', async () => {
      userRepo.findOne.mockResolvedValue({ id: 1 });
      userRepo.findByEmail.mockResolvedValue({ id: 2 }); // email belongs to another user
      await expect(service.update(1, { email: 'existing@example.com' }, 1)).rejects.toThrow(ConflictException);
    });

    it('should update user successfully with valid email and password', async () => {
      const dto = { email: 'new@example.com', password: '123456' };
      userRepo.findOne.mockResolvedValue({ id: 1 });
      userRepo.findByEmail.mockResolvedValue(null);
      userRepo.update.mockResolvedValue({
        id: 1,
        email: 'new@example.com',
        password: 'hashed',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.update(1, dto, 1);
      expect(result.message).toBe('User updated successfully!');
      expect(result.user.email).toBe('new@example.com');
    });
  });
});