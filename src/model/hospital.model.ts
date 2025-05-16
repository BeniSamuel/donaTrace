import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("hospital")
export class Hospital {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    location: string;

    constructor (name: string, location: string) {
        this.name = name;
        this.location = location;
    }
}