import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Auth') // Grupo de rota no Swagger
@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Authenticate user and return access token' })
  @ApiResponse({ status: 200, description: 'User authenticated successfully', schema: {
    example: {
      atk: 'jwt.token.string'
    }
  }})
  @ApiResponse({ status: 400, description: 'Invalid request' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBody({ type: CreateUserDto })
  async login(@Body() loginDto: CreateUserDto) {
    return this.authService.login(loginDto);
  }

  @Post('signup')
  @HttpCode(201)
  @ApiOperation({ summary: 'Register new user and return access token' })
  @ApiResponse({ status: 201, description: 'User registered successfully', schema: {
    example: {
      atk: 'jwt.token.string'
    }
  }})
  @ApiResponse({ status: 400, description: 'Invalid request' })
  @ApiResponse({ status: 409, description: 'Email already registered' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBody({ type: CreateUserDto })
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(
      createUserDto.email,
      createUserDto.password,
    );
  }
}