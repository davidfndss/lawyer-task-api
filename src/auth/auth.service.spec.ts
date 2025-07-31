import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/user.repository';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;
  let userRepo: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'signed_jwt_token'),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
    userRepo = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user data without password if credentials are valid', async () => {
      const hashedPassword = await bcrypt.hash('123456', 10);
      const mockUser = {
        id: 1,
        email: 'test@test.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

      const result = await service.validateUser('test@test.com', '123456');
      expect(result).toEqual({
        id: 1,
        email: 'test@test.com',
        createdAt: mockUser.createdAt,
        updatedAt: mockUser.updatedAt,
      });
    });

    it('should return null if credentials are invalid', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);
      const result = await service.validateUser('wrong@test.com', 'wrong');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return token if user is validated', async () => {
      jest.spyOn(service, 'validateUser').mockResolvedValue({
        id: 1,
        email: 'test@test.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.login({
        email: 'test@test.com',
        password: '123456',
      });

      expect(result).toEqual({ atk: 'signed_jwt_token' });
    });

    it('should throw if user is not validated', async () => {
      jest.spyOn(service, 'validateUser').mockResolvedValue(null);
      await expect(
        service.login({ email: 'fail@test.com', password: 'fail' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('signup', () => {
    it('should throw if user already exists', async () => {
      jest.spyOn(userRepo, 'findByEmail').mockResolvedValue({
        id: 1,
        email: 'exists@test.com',
        password: 'hashed',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await expect(
        service.signup('exists@test.com', '123456'),
      ).rejects.toThrow(ConflictException);
    });

    it('should create a new user and return token', async () => {
      jest.spyOn(userRepo, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(prismaService.user, 'create').mockResolvedValue({
        id: 2,
        email: 'new@test.com',
        password: 'hashed',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.signup('new@test.com', '123456');
      expect(result).toEqual({ atk: 'signed_jwt_token' });
    });
  });
});