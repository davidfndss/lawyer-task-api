import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userRepo: UserRepository
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const payload = { email: user.email, sub: user.id };
    return {
      atk: this.jwtService.sign(payload),
    };
  }

  async signup(email: string, password: string) {

    const foundUser = await this.userRepo.findByEmail(email);
    if (foundUser) {
      throw new ConflictException('An User with this email already exists');
    }

    const hashed = await bcrypt.hash(password, 10);
    const userCreated = await this.prisma.user.create({ data: { email, password: hashed } });

    const payload = { email: userCreated.email, sub: userCreated.id };
    return {
      atk: this.jwtService.sign(payload),
    };
  }
}