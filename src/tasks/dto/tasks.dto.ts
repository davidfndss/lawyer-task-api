import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsDateString,
  IsInt,
  IsOptional,
} from 'class-validator';
import { TaskPriority, TaskStatus } from 'generated/prisma/client';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Task title',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Task description',
  })
  description: string;

  @IsEnum(TaskStatus)
  @ApiProperty({
    description: 'Task status',
    enum: TaskStatus,
  })
  status: TaskStatus;

  @IsEnum(TaskPriority)
  @ApiProperty({
    description: 'Task priority',
    enum: TaskPriority,
  })
  priority: TaskPriority;

  @IsDateString()
  @ApiProperty({
    description: 'Task due date',
    type: String,
    format: 'date-time',
  })
  dueDate: string;

  @IsInt()
  @ApiProperty({
    description: 'Client ID associated with the task',
  })
  clientId: number;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Task title',
    required: false,
  })
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Task description',
    required: false,
  })
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  @ApiProperty({
    description: 'Task status',
    required: false,
    enum: TaskStatus,
  })
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority)
  @ApiProperty({
    description: 'Task priority',
    required: false,
    enum: TaskPriority,
  })
  priority?: TaskPriority;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: 'Task due date',
    type: String,
    format: 'date-time',
    required: false,
  })
  dueDate?: string;

  @IsOptional()
  @IsInt()
  @ApiProperty({
    description: 'Client ID associated with the task',
    required: false,
  })
  clientId?: number;
}

export class TaskResponseDto {
  @ApiProperty({ description: 'Task ID' })
  id: number;

  @ApiProperty({ description: 'Task title' })
  title: string;

  @ApiProperty({ description: 'Task description' })
  description: string;

  @ApiProperty({ description: 'Task status', enum: TaskStatus })
  status: TaskStatus;

  @ApiProperty({ description: 'Task priority', enum: TaskPriority })
  priority: TaskPriority;

  @ApiProperty({ description: 'Task due date', type: String, format: 'date-time' })
  dueDate: Date;

  @ApiProperty({ description: 'Task creation date', type: String, format: 'date-time' })
  createdAt: Date;

  @ApiProperty({ description: 'Task last update date', type: String, format: 'date-time' })
  updatedAt: Date;

  @ApiProperty({ description: 'Client ID associated with the task' })
  clientId: number;
}