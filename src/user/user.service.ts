import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async findOne(id: number, userId: number) {
    if (id !== userId) {
      throw new UnauthorizedException('You can only view your own profile');
    }

    const foundUser = await this.userRepo.findOne(id);

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    return foundUser;
  }

  async update(id: number, dto: UpdateUserDto, userId: number) {
    // Validations sequence:
    // 1. Check if the user is not trying to update another profile.
    // 2. Check if the user exists on database.
    // 3. Check if the user sent at least one field to update.
    // 4. Check if the email to update already exists on database.
    // 5. If password is provided, hash it before updating.

    if (id !== userId) {
      throw new UnauthorizedException('You can only update your own profile');
    }

    const foundUser = await this.userRepo.findOne(id);
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    if (!dto.email && !dto.password) {
      throw new BadRequestException('You must provide at least one field to update');
    }

    if (dto.email) {
      const foundUserByEmail = await this.userRepo.findByEmail(dto.email!);
      if (foundUserByEmail && foundUserByEmail.id !== id) {
        throw new ConflictException('An User with this email already exists');
      }
    }

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    } else {
      delete dto.password;
    }

    return this.userRepo.update(id, dto);
  }

  remove(id: number, userId: number) {
    if (id !== userId) {
      throw new UnauthorizedException('You can only delete your own profile');
    }

    return this.userRepo.remove(id);
  }
}
