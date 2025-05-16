import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Inventory } from "src/model/inventory.model";
import { Repository } from "typeorm";

@Injectable()
export class InventoryService {
    constructor (@InjectRepository(Inventory) private readonly inventoryRepository: Repository<Inventory>) {};

    getAllInventories (): Promise<Inventory[]> {
        return this.inventoryRepository.find();
    }

    getInventoryById (id: number): Promise<Inventory> {
        return this.inventoryRepository.findOne({where: {id}});
    }
    
}