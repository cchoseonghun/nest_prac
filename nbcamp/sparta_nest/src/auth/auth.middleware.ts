import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: any, res: any, next: Function) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('JWT not found');
    }

    let token: string;
    try {
      token = authHeader.split(' ')[1];
      // 클라이언트가 헤더에 Authorization 필드로 Bearer {JWT} 를 보내면 
      // AuthMiddleware는 JWT는 파싱하여 특정 유저임을 파악할 수 있다.
      const payload = await this.jwtService.verify(token);
      req.user = payload;
      next();
    } catch (err) {
      throw new UnauthorizedException(`Invalid JWT: ${token}`);
    }
  }
}
