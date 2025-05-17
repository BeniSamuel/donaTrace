import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from "typeorm";
import { User } from "./user.model";
import { Inventory } from "./inventory.model";

@Entity("donation")
export class Donation {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.id)
    donor: User;

    @Column()
    bloodType: string;

    @Column()
    volume: number;

    @Column()
    donatedAt: Date;

    @ManyToOne(() => Inventory, (inventory) => inventory.id)
    inventory: Inventory;
    
    constructor (donor: User, bloodType: string, volume: number, donatedAt: Date, inventory: Inventory) {
        this.donor = donor;
        this.bloodType = bloodType;
        this.volume = volume;
        this.donatedAt = donatedAt;
        this.inventory = inventory;
    }
    
}