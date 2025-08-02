import { validate } from 'class-validator';
import { CreateClientDto } from './clients.dto';

describe('CreateClientDto', () => {
  it('should validate required fields', async () => {
    const dto = new CreateClientDto();
    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    const props = errors.map(e => e.property);
    expect(props).toContain('name');
    expect(props).toContain('email');
  });

  it('should pass validation with valid data', async () => {
    const dto = new CreateClientDto();
    dto.name = 'John Doe';
    dto.email = 'john@example.com';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail with invalid email', async () => {
    const dto = new CreateClientDto();
    dto.name = 'Test';
    dto.email = 'invalid-email';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('email');
  });
});
