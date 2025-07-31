import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';

describe('ClientsController', () => {
  let controller: ClientsController;
  let clientsService: ClientsService;

  beforeEach(async () => {
    const mockClientsService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
      deleteAllByUserId: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController], 
      providers: [{
        provide: ClientsService,
        useValue: mockClientsService,
      }],
    }).compile();

    controller = module.get<ClientsController>(ClientsController);
    clientsService = module.get<ClientsService>(ClientsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
