import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './application/services';
import { RegisterRequestDto } from './application/dto/register.dto';
import { LoginRequestDto } from './application/dto/login-request.dto';
import { AuthGuard } from './auth.guard';
import { RegisterResponseDto } from './application/dto/register-response.dto';
import { LoginResponseDto } from './application/dto/login-response.dto';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({
    description: 'The user has been successfully logged in.',
    type: LoginResponseDto,
  })
  @ApiBody({
    description: 'The user to login',
    type: LoginRequestDto,
  })
  async login(@Body() loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiCreatedResponse({
    description: 'The user has been successfully registered.',
    type: RegisterResponseDto,
  })
  @ApiBody({
    description: 'The user to register',
    type: RegisterRequestDto,
  })
  async register(
    @Body() registerDto: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    return this.authService.register(registerDto);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'The user has been successfully logged out.',
  })
  async logout(@Req() request: Request): Promise<void> {
    return this.authService.logout(request['userId']);
  }
}
