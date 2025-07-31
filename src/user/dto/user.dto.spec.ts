import { validate } from 'class-validator';
import { CreateUserDto } from './user.dto';

describe('CreateUserDto Validation', () => {
  it('should fail when email is invalid and password is too short', async () => {
    const dto = new CreateUserDto();
    dto.email = 'invalid-email';
    dto.password = '123';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should pass validation with valid email and password', async () => {
    const dto = new CreateUserDto();
    dto.email = 'valid@example.com';
    dto.password = '123456';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
