import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = new PrismaService();

    // Mocka o método $connect para não conectar de verdade no banco
    prismaService.$connect = jest.fn().mockResolvedValue(undefined);
  });

  it('should be defined', () => {
    expect(prismaService).toBeDefined();
  });

  it('should call $connect on module init', async () => {
    await prismaService.onModuleInit();
    expect(prismaService.$connect).toHaveBeenCalled();
  });
});
