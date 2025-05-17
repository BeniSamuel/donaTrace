import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ResponseEntity } from "src/utils/response.util";
import { User } from "src/model/user.model";
import { RegisterDto } from "src/dto/register.dto";
import { LoginDto } from "src/dto/login.dto";

@Controller("/api/donatrace/auth")
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @Post("/register")
    @HttpCode(HttpStatus.CREATED)
    async registerUser (@Body() registerDto: RegisterDto): Promise<ResponseEntity<User>> {
        return ResponseEntity.created("Successfully registered a user!!! 🎉🎉🎉", await this.authService.registerUser(registerDto));
    }

    @Post("/login")
    @HttpCode(HttpStatus.OK || HttpStatus.BAD_REQUEST)
    loginUser (@Body() loginDto: LoginDto): Promise<ResponseEntity<String>> {
        return this.authService.loginUser(loginDto);
    }
}