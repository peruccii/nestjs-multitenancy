import { Body, Controller, Post } from '@nestjs/common';
import { CreatePartnerUserDto } from '../users/dto/create-partner-user.dto';
import { UserPresenter } from '../users/user.presenter';
import { UsersService } from '../users/users.service';

@Controller('partner/users')
export class PartnerUsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async create(@Body() data: CreatePartnerUserDto) {
   const user = await this.userService.createPartnerUser(data)
   return new UserPresenter(user)
  }
}
