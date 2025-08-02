import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Client name',
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Client email address',
  })
  email: string;
}

export class UpdateClientDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Client name', required: false })
  name?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({ description: 'Client email address', required: false })
  email?: string;
}

export class ClientResponseDto {
  @ApiProperty({ description: 'Client ID' })
  id: number;

  @ApiProperty({ description: 'Client name' })
  name: string;

  @ApiProperty({ description: 'Client email address' })
  email: string;
}