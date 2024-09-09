import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';  // Guard для аутентификации
import { ROLES_KEY } from '../roles.decorator';  // Декоратор для ролей

@Injectable()
export class RolesGuard extends JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // Если роль не требуется, пропускаем
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.includes(user.role);  // Сравниваем роль пользователя с требуемой ролью
  }
}
