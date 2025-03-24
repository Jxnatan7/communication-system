import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { User, UserRole } from "src/user/core/schemas/user.schema";

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    if (!user || user.role !== UserRole.ADMIN) {
      throw new ForbiddenException("Access denied: Admins only");
    }

    return true;
  }
}
