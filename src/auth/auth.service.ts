import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "src/dto/login.dto";
import { RegisterDto } from "src/dto/register.dto";
import { User } from "src/model/user.model";
import { UserService } from "src/users/users.service";
import { ResponseEntity } from "src/utils/response.util";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    registerUser (registerDto: RegisterDto): Promise<User> {
        return this.userService.createUser(registerDto);
    }

    async loginUser (loginDto: LoginDto): Promise<ResponseEntity<String>> {
        const user = await this.userService.getUserByEmail(loginDto.email);
        if (!user) {
            return ResponseEntity.badRequest("Bad credentials provided email!!! 😔💔💔", null);
        }
        if (await bcrypt.compare(user.password, loginDto.password) !== false) {
            return ResponseEntity.badRequest("Bad credentials provided password!!! 😔💔💔", null);
        }
        const token = this.jwtService.sign(user.email);
        return ResponseEntity.ok("Successfully logged in user!!! 🎉🎉🎉", token);
    }
}