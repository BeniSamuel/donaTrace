import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Hospital } from "src/model/hospital.model";
import { HospitalController } from "./hospital.controller";
import { HospitalService } from "./hospital.service";

@Module({
    imports: [TypeOrmModule.forFeature([Hospital])],
    controllers: [HospitalController],
    providers: [HospitalService]
})
export class HospitalModule {}