import { Body, Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ResponseEntity } from "src/utils/response.util";
import { User } from "src/model/user.model";
import { RegisterDto } from "src/dto/register.dto";
import { LoginDto } from "src/dto/login.dto";

@Controller("/api/donatrace/auth")
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    async registerUser (@Body() registerDto: RegisterDto): Promise<ResponseEntity<User>> {
        return ResponseEntity.created("Successfully registered a user!!! 🎉🎉🎉", await this.authService.registerUser(registerDto));
    }

    loginUser (@Body() loginDto: LoginDto): Promise<ResponseEntity<String>> {
        return this.authService.loginUser(loginDto);
    }
}