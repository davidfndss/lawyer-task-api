import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    login: jest.fn(),
    signup: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return access token on successful login', async () => {
      const loginDto = { email: 'test@test.com', password: '123456' };
      const result = { atk: 'jwt.token.string' };
      mockAuthService.login.mockResolvedValue(result);

      expect(await controller.login(loginDto)).toEqual(result);
      expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
    });
  });

  describe('signup', () => {
    it('should return access token on successful signup', async () => {
      const createUserDto = { email: 'test@test.com', password: '123456' };
      const result = { atk: 'jwt.token.string' };
      mockAuthService.signup.mockResolvedValue(result);

      expect(await controller.signup(createUserDto)).toEqual(result);
      expect(mockAuthService.signup).toHaveBeenCalledWith(createUserDto.email, createUserDto.password);
    });
  });
});
