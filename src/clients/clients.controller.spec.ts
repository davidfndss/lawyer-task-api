import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/clients.dto';

describe('ClientsController', () => {
  let controller: ClientsController;
  let service: ClientsService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [
        { provide: ClientsService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<ClientsController>(ClientsController);
    service = module.get<ClientsService>(ClientsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with correct data', async () => {
      const dto: CreateClientDto = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '12345678',
      };
      const mockUser = { user: { id: 1 } };
      const result = { id: 1, ...dto };

      mockService.create.mockResolvedValue(result);

      const response = await controller.create(dto, mockUser);
      expect(response).toEqual(result);
      expect(mockService.create).toHaveBeenCalledWith(dto, 1);
    });
  });

  describe('findAll', () => {
    it('should call service.findAll with user ID', async () => {
      const mockUser = { user: { id: 1 } };
      const clients = [{ id: 1, name: 'Test', email: 't@test.com', phone: '123' }];

      mockService.findAll.mockResolvedValue(clients);

      const result = await controller.findAll(mockUser);
      expect(result).toEqual(clients);
      expect(mockService.findAll).toHaveBeenCalledWith(1);
    });
  });
});
