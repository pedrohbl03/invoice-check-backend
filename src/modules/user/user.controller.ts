import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './application/services';
import { CreateUserDto } from './application';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { UpdateUserDto } from './application/dto/update-user.dto';
import { UserResponseDto } from './application/dto/user-response.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: UserResponseDto,
  })
  @ApiBody({
    description: 'The user to create',
    type: CreateUserDto,
  })
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @ApiBody({
    description: 'The user to update',
    type: UpdateUserDto,
  })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @ApiOkResponse({
    description: 'The user has been successfully updated.',
    type: UserResponseDto,
  })
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The user has been successfully found.',
    type: UserResponseDto,
  })
  async getUser(@Param('id') id: string): Promise<UserResponseDto | null> {
    return this.userService.findUserById(id);
  }

  @ApiOkResponse({
    description: 'The users have been successfully found.',
    type: [UserResponseDto],
  })
  @Get()
  async getUsers(): Promise<UserResponseDto[]> {
    return this.userService.findAllUsers();
  }
}
