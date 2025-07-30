import { IsEnum, IsNotEmpty, IsString, IsDateString, IsInt } from 'class-validator';
import { TaskPriority, TaskStatus } from 'generated/prisma/client';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @IsDateString()
  dueDate: string;

  @IsInt()
  clientId: number;
}


export class UpdateTaskDto extends PartialType(CreateTaskDto) {}