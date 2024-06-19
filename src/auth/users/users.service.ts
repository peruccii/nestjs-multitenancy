import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRoles } from './user-roles';
import * as bcrypt from 'bcrypt';
import { CreatePartnerUserDto } from './dto/create-partner-user.dto';
import { CreateCommonUserDto } from './dto/create-common-user.dto copy';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  createPartnerUser(data: CreatePartnerUserDto) {
    return this.prismaService.user.create({
      data: {
        ...data,
        password: this.generateHash(data.password),
        roles: [UserRoles.PARTNER],
      },
    });
  }

  createCommonUser(data: CreateCommonUserDto) {
    return this.prismaService.user.create({
      data: {
        ...data,
        password: this.generateHash(data.password),
        roles: [UserRoles.USER],
      },
    });
  }

  generateHash(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  findUser(idOrEmail: number | string) {
    return this.prismaService.user.findFirst({
      where: {
        ...(typeof idOrEmail === 'number'
          ? { id: idOrEmail }
          : { email: idOrEmail }),
      },
    });
  }

  listAll() {
   return this.prismaService.user.findMany()
  }
}
