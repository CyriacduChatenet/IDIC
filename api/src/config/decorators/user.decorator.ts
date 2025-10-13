/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<{ headers: { authorization?: string } }>();
    const jwtService = new JwtService({});
    const authHeader = request.headers.authorization;
    const authToken = authHeader ? authHeader.replace('Bearer ', '') : '';
    const payload = jwtService.decode(authToken);

    return payload;
  },
);
