import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { ResponseEntity } from "src/utils/response.util";

export class AuthGuard implements CanActivate {
    constructor (private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromRequest(request);

        if (!token) {
            throw new UnauthorizedException(ResponseEntity.badRequest("Bad request you are not authorized", null));
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: "&4!0!BeNi@Ish#123*$!!"
            });

            request["user"] = payload;
            return true;
        } catch (error) {
            throw new UnauthorizedException("You are not authorized!!! ❌❌❌");
            return false;   
        }
    }

    extractTokenFromRequest (request: Request): string {
        if (!request.headers.authorization) {
            throw new UnauthorizedException("token not found!!! 😔💔💔");
        }
        const [type, token] = request.headers.authorization.split(" ");
        if (!type) {
            throw new UnauthorizedException("token not found!!! 😔💔💔");
        }
        return type === "Bearer" ? token : null;
    }
    
}