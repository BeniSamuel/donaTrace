import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterDto } from "src/dto/register.dto";
import { User } from "src/model/user.model";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
    constructor (@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    getAllUsers (): Promise<User[]> {
        return this.userRepository.find();
    }

    getUserById (id: number): Promise<User> {
        return this.userRepository.findOne({where: {id}});
    }

    getUserByEmail (email: string): Promise<User> {
        return this.userRepository.findOne({where: {email}});
    }

    async createUser (registerDto: RegisterDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const newUser = new User(registerDto.name, registerDto.email, hashedPassword, registerDto.role );

        return this.userRepository.save(newUser);
    }

    async updateUserById (id: number,registerDto: RegisterDto): Promise<User> {
        const user = await this.getUserById(id);
        if (user != null) {
            user.name = registerDto.name;
            user.email = registerDto.email;
            user.password = registerDto.password;
            user.role = registerDto.role;

            return this.userRepository.save(user);
        }
        return null;
    }

    async deleteUserById (id: number): Promise<Boolean> {
        const user = await this.getUserById(id);
        if (user != null) {
            this.userRepository.delete(user);
            return true;
        }
        return false;
    }
}