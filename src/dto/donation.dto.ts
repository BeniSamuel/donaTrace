import { IsNotEmpty } from "class-validator";

export class DonationDto {
    @IsNotEmpty()
    donor_id: number;

    @IsNotEmpty()
    blood_type: string;

    @IsNotEmpty()
    volume: number;

    @IsNotEmpty()
    donateAt: Date;

    @IsNotEmpty()
    inventory_id: number;
}