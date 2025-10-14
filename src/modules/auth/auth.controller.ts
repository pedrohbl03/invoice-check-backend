import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './application/services';
import { RegisterDto } from './application/dto/register.dto';
import { LoginDto } from './application/dto/login.dto';
import { UserEntity } from '../user/domain/entities/user.entity';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ user: UserEntity, tokens: { accessToken: string, refreshToken: string } }> {
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<{ user: UserEntity, tokens: { accessToken: string, refreshToken: string } }> {
    return this.authService.register(registerDto);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Req() request: Request): Promise<void> {
    return this.authService.logout(request['userId']);
  }
} 
