import { Controller, Get } from '@nestjs/common';
import { AuthService } from './application/services';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }
}
