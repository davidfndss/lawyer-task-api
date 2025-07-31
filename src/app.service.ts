import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcome(): string {
    return 'Welcome to the LawyerTask API! This API provides endpoints for managing tasks, users, authentication, and clients. For more information, please refer to the API documentation. check the Swagger UI at /doc';
  }
}
