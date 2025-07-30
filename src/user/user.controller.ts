import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiOkResponse({ description: 'User found', type: CreateUserDto })
  findOne(@Param('id') id: string, @Request() req) {
    return this.userService.findOne(+id, req.user.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto, @Request() req) {
    return this.userService.update(+id, dto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete user by ID' })
  remove(@Param('id') id: string, @Request() req) {
    return this.userService.remove(+id, req.user.id);
  }
}