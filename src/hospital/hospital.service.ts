import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HospitalDto } from "src/dto/hospital.dto";
import { Hospital } from "src/model/hospital.model";
import { Repository } from "typeorm";

@Injectable()
export class HospitalService {
    constructor (@InjectRepository(Hospital) private readonly hospitalRepository: Repository<Hospital>) {}

    getAllHospitals (): Promise<Hospital[]> {
        return this.hospitalRepository.find();
    }

    getHospitalById (id: number): Promise<Hospital> {
        return this.hospitalRepository.findOne({where: {id}});
    }

    getHospitalByName (name: string): Promise<Hospital> {
        return this.hospitalRepository.findOne({where: {name}});
    }

    getHospitalByLocation (location: string): Promise<Hospital> {
        return this.hospitalRepository.findOne({where: {location}});
    }

    createHospital (hospitalDto: HospitalDto): Promise<Hospital> {
        const newHospital = new Hospital (hospitalDto.name, hospitalDto.location);
        return this.hospitalRepository.save(newHospital);
    }

    async updateHospitalById (id: number, hospitalDto: HospitalDto): Promise<Hospital> {
        const hospital = await this.getHospitalById(id);
        if (hospital != null) {
            hospital.name = hospitalDto.name;
            hospital.location = hospitalDto.location;

            return this.hospitalRepository.save(hospital);
        }
        return null;
    }

    async deleteHospitalById (id: number): Promise<Boolean> {
        const hospital = await this.getHospitalById(id);
        if (hospital != null) {
            this.hospitalRepository.delete(hospital);
            return true;
        }
        return false;
    }
}