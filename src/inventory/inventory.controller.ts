import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { InventoryService } from "./inventory.service";
import { ResponseEntity } from "src/utils/response.util";
import { Inventory } from "src/model/inventory.model";
import { InventoryDto } from "src/dto/inventory.dto";

@Controller("/api/donatrace/inventory")
export class InventoryController {
    constructor (private readonly inventoryService: InventoryService) {};

    @Get("/all")
    @HttpCode(HttpStatus.OK)
    async getAllInventory (): Promise<ResponseEntity<Inventory[]>> {
        return ResponseEntity.ok("Successfully obtained all inventory!!! 🎉🎉🎉", await this.inventoryService.getAllInventories());
    }

    @Get("/hospital/hospitalId")
    @HttpCode(HttpStatus.OK || HttpStatus.NOT_FOUND)
    async getAllInventoryByHospitalId (@Param("hospitalId") hospitalId: number): Promise<ResponseEntity<Inventory[]>> {
        const inventories: Inventory[] = await this.inventoryService.getInventoriesByHospital(hospitalId);
        if (inventories.length !== 0) {
            return ResponseEntity.ok("Successfully obtained inventories from hospital!!! 🎉🎉🎉", inventories);
        }
        return ResponseEntity.notFound("Sorry hospital not found!!! 😔💔💔", null);
    }
    
    @Post("/create")
    @HttpCode(HttpStatus.CREATED || HttpStatus.NOT_FOUND)
    async createInventory (@Body() inventoryDto: InventoryDto): Promise<ResponseEntity<Inventory>> {
        const newInventory = await this.inventoryService.createInventory(inventoryDto);
        if (newInventory != null) {
            return ResponseEntity.created("Successfully created an inventory!!! 🎉🎉🎉", newInventory);
        }
        return ResponseEntity.notFound("Sorry hospital not found!!! 😔💔💔", null);
    }
}