import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hospital } from "./hospital.model";

@Entity("inventory")
export class Inventory {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Hospital, (hospital) => hospital.id)
    hospital: Hospital;

    @Column()
    bloodType: string;
    
    constructor (hospital: Hospital, bloodType: string) {
        this.hospital = hospital;
        this.bloodType = bloodType;
    }
}