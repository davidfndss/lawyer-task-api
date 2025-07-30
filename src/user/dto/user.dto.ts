import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { TaskResponseDto } from "src/tasks/dto/tasks.dto";

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({ description: 'User email address' })
  email: string;


  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ description: 'User password', minLength: 6 })
  password: string;
}

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty({ description: 'User email address', required: false })
  email?: string;

  @IsOptional()
  @MinLength(6)
  @ApiProperty({ description: 'User password', minLength: 6, required: false })
  password?: string;
}

export class UserResponseDto {
  @ApiProperty({ description: 'User ID' })
  id: number;

  @ApiProperty({ description: 'User email address' })
  email: string;

  @ApiProperty({ description: 'User password' })
  password: string;

  @ApiProperty({ description: 'User creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'User last update date' })
  updatedAt: Date;

  @ApiProperty({ description: 'List of tasks associated with the user', type: [TaskResponseDto] })
  Tasks: TaskResponseDto[]
}