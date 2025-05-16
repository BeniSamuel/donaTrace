import { IsNotEmpty } from "class-validator";

export class HospitalDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    location: string;
}