import { IsNotEmpty } from "class-validator";

export class InventoryDto {
    @IsNotEmpty()
    hospital_id: number;

    @IsNotEmpty()
    bloodType: string;
}