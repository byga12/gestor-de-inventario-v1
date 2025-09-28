import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create_user.dto';
import { AdminGuard } from 'src/auth/admin.guard';

@UseGuards(AdminGuard)
@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  // @UseGuards(AdminGuard)
  @Get('/user')
  async getAllUsers() {
    return await this.userService.getUsers();
  }

  // @UseGuards(AdminGuard)
  @Post('/user')
  @UsePipes(new ValidationPipe())
  async addUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.addUser(createUserDto);
  }

  // @UseGuards(AdminGuard)
  @Delete('/user/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  // TODO update
}
