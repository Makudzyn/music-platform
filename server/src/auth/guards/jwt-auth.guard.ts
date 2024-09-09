import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) { //Check data passed through guards
  //   console.log('User in guard:', user); // Должно вывести объект user
  //   return super.handleRequest(err, user, info, context, status);
  // }
}
