import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto, UpdateClientDto } from './dto/clients.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { ClientResponseDto } from './dto/clients.dto';

@ApiTags('Clients')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/clients')
export class ClientsController {
  constructor(private readonly clientService: ClientsService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new client' })
  @ApiBody({ type: CreateClientDto })
  @ApiResponse({ status: 201, description: 'Client created successfully', type: ClientResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  create(@Body() dto: CreateClientDto, @Request() req) {
    return this.clientService.create(dto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all clients for authenticated user' })
  @ApiResponse({ status: 200, description: 'List of clients', type: [ClientResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findAll(@Request() req) {
    return this.clientService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific client by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Client ID' })
  @ApiResponse({ status: 200, description: 'Client found', type: ClientResponseDto })
  @ApiResponse({ status: 404, description: 'Client not found or access denied' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.clientService.findOne(+id, req.user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a specific client by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Client ID' })
  @ApiBody({ type: UpdateClientDto })
  @ApiResponse({ status: 200, description: 'Client updated successfully' })
  @ApiResponse({ status: 400, description: 'Validation failed or no fields provided' })
  @ApiResponse({ status: 404, description: 'Client not found or access denied' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  update(@Param('id') id: string, @Body() dto: UpdateClientDto, @Request() req) {
    return this.clientService.update(+id, dto, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific client by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Client ID' })
  @ApiResponse({ status: 200, description: 'Client deleted successfully' })
  @ApiResponse({ status: 404, description: 'Client not found or access denied' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  remove(@Param('id') id: string, @Request() req) {
    return this.clientService.remove(+id, req.user.id);
  }
}
