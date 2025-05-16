import { IsEmail, IsEnum, IsNotEmpty, Length } from "class-validator";
import { Role } from "src/enums/role.enum";

export class RegisterDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(6, 12)
    password: string;

    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;
    
}