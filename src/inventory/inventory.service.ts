import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InventoryDto } from "src/dto/inventory.dto";
import { HospitalService } from "src/hospital/hospital.service";
import { Inventory } from "src/model/inventory.model";
import { Repository } from "typeorm";

@Injectable()
export class InventoryService {
    constructor (
        @InjectRepository(Inventory) private readonly inventoryRepository: Repository<Inventory>,
        private readonly hospitalService: HospitalService
    ) {};

    getAllInventories (): Promise<Inventory[]> {
        return this.inventoryRepository.find();
    }

    getInventoryById (id: number): Promise<Inventory> {
        return this.inventoryRepository.findOne({where: {id}});
    }
    
    async getInventoriesByHospital (id: number): Promise<Inventory[]> {
        const hospital = await this.hospitalService.getHospitalById(id);
        if (hospital != null) {
            return this.inventoryRepository.find({where: {hospital}});
        }
        return null;
    }

    async createInventory (inventoryDto: InventoryDto): Promise<Inventory> {
        const hospital = await this.hospitalService.getHospitalById(inventoryDto.hospital_id);
        if (hospital != null) {
            const newInventory = new Inventory(hospital, inventoryDto.bloodType);
            return this.inventoryRepository.save(newInventory);
        }
        return null;
    }
    
    async deleteInventory (hospitalId: number, inventoryId: number): Promise<Boolean> {
        const hospital = await this.hospitalService.getHospitalById(hospitalId);
        if (hospital == null) return false;

        const inventory = await this.inventoryRepository.findOne({where: {
            id: inventoryId,
            hospital: hospital
        }})
        if (inventory == null) return false;

        this.inventoryRepository.delete(inventory);
        return true;
    }
}