import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserPresenter } from './user.presenter';
import { CreateCommonUserDto } from './dto/create-common-user.dto copy';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async create(@Body() data: CreateCommonUserDto) {
    const user = await this.userService.createCommonUser(data);
    return new UserPresenter(user);
  }

  @Get()
  listAll() {
    return this.userService.listAll();
  }
}
