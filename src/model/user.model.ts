import { Role } from "src/enums/role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({type: String, enum: Role, default: Role.DONOR})
    role: Role;

    constructor (name: string, email: string, password: string, role: Role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

}