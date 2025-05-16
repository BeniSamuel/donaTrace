import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { HospitalService } from "./hospital.service";
import { ResponseEntity } from "src/utils/response.util";
import { Hospital } from "src/model/hospital.model";
import { HospitalDto } from "src/dto/hospital.dto";

@Controller("/api/donatrace/hospital")
export class HospitalController {
    constructor (private readonly hospitalService: HospitalService) {}

    @Get("/all")
    @HttpCode(HttpStatus.OK)
    async getAllHospitals (): Promise<ResponseEntity<Hospital[]>> {
        return ResponseEntity.ok("Successfully obtained all hospitals!!! 🎉🎉🎉", await this.hospitalService.getAllHospitals());
    }

    @Get("/:hospitalId")
    @HttpCode(HttpStatus.OK || HttpStatus.NOT_FOUND)
    async getHospitalById (@Param("hospitalId") hospitalId: number): Promise<ResponseEntity<Hospital>> {
        const hospital = await this.hospitalService.getHospitalById(hospitalId);
        if (hospital != null) {
            return ResponseEntity.ok("Success obtained hospital!!! 🎉🎉🎉", hospital);
        }
        return ResponseEntity.notFound("Sorry hospital not found!!! 😔💔💔", null);
    }

    @Post("/create")
    @HttpCode(HttpStatus.CREATED)
    async createHospital (@Body() hospitalDto: HospitalDto): Promise<ResponseEntity<Hospital>> {
        return ResponseEntity.created("Successfully created hospital!!! 🎉🎉🎉", await this.hospitalService.createHospital(hospitalDto));
    }

    @Put("/:hospitalId")
    @HttpCode(HttpStatus.OK || HttpStatus.NOT_FOUND)
    async updateHospitalById (@Param("hospitalId") hospitalId: number, @Body() hospitalDto: HospitalDto): Promise<ResponseEntity<Hospital>> {
        const hospital = await this.hospitalService.updateHospitalById(hospitalId, hospitalDto);
        if (hospital != null) {
            return ResponseEntity.ok("Successfully updated hospital!!! 🎉🎉🎉", hospital);
        }
        return ResponseEntity.notFound("Sorry hospital not found!!! 😔💔💔", null);
    }

    @Delete("/:hospitalId")
    @HttpCode(HttpStatus.OK || HttpStatus.NOT_FOUND)
    async deleteHospitalById (@Param("hospitalId") hospitalId: number): Promise<ResponseEntity<Boolean>> {
        const hospital = await this.hospitalService.deleteHospitalById(hospitalId);
        return hospital ? 
        ResponseEntity.ok("Successfully deleted hospital!!!", hospital) :
        ResponseEntity.notFound("Sorry hospital not found!!! 😔💔💔", null);    
    }
}