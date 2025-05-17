import { IsEmail, IsEnum, IsNotEmpty, Length } from "class-validator";
import { Role } from "src/enums/role.enum";

export class RegisterDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;
    
}