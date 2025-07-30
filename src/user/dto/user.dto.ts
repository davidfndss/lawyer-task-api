import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  @MinLength(6)
  password?: string;
}

// export class UserResponseDto {
//   id: number;
//   email: string;
//   createdAt: Date;
//   updatedAt: Date;
//   Tasks: []
// }