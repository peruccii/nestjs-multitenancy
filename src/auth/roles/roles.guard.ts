import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from '../users/user-roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflactor: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const requiredRoles = this.reflactor.getAllAndOverride<UserRoles[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return  
    }

    const { user } = context.switchToHttp().getRequest()
    return requiredRoles.some((role) => user.roles?.includes(role))
  }
}
