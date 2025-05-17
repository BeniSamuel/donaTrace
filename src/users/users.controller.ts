import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Put } from "@nestjs/common";
import { UserService } from "./users.service";
import { ResponseEntity } from "src/utils/response.util";
import { User } from "src/model/user.model";
import { RegisterDto } from "src/dto/register.dto";

@Controller("/api/donatrace/users")
export class UserController {
    constructor (private readonly userService: UserService) {}

    @Get("/all")
    @HttpCode(HttpStatus.OK)
    async getAllUsers (): Promise<ResponseEntity<User[]>> {
        return ResponseEntity.ok("Successfully obtained all users!!! 🎉🎉🎉", await this.userService.getAllUsers())
    }

    @Get("/:userId")
    @HttpCode(HttpStatus.OK || HttpStatus.NOT_FOUND)
    async getUserById (@Param("userId") userId: number): Promise<ResponseEntity<User>> {
        const user = await this.userService.getUserById(userId);
        if (user != null) {
            return  ResponseEntity.ok("Successfully obtained user!!! 🎉🎉🎉", user);
        }
        return ResponseEntity.notFound("Sorry user not found!!! 😔💔💔", null);
    }

    @Put("/:userId")
    @HttpCode(HttpStatus.OK || HttpStatus.NOT_FOUND)
    async updateUserById (@Param("userId") userId: number, @Body() registerDto: RegisterDto): Promise<ResponseEntity<User>> {
        const user = await this.userService.updateUserById(userId, registerDto);
        if (user != null) {
            return ResponseEntity.ok("Successfully updated user!!! 🎉🎉🎉", user);
        }
        return ResponseEntity.notFound("Sorry user not found!!! 😔💔💔", null);
    }

    @Delete("/:userId")
    async deleteUserById (@Param("userId") userId: number): Promise<ResponseEntity<Boolean>> {
        return this.userService.deleteUserById(userId) ?
        ResponseEntity.ok("Successfully deleted user!!! 🎉🎉🎉", true) :
        ResponseEntity.notFound("Sorry user not found!!! 😔💔💔", null); 
    }
}