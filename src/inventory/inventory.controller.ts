import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
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

    @Get("/hospital/:hospitalId")
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

    @Put("/hospital/:hospitalId/:inventoryId")
    async updateInventory (@Param("hospitalId") hospitalId: number, @Param("inventoryId") inventoryId: number, @Body() inventoryDto: InventoryDto): Promise<ResponseEntity<Inventory>> {
        const inventory: Inventory = await this.inventoryService.updateInventory(hospitalId, inventoryId, inventoryDto);
        if (inventory != null) {
            return ResponseEntity.ok("Successfully updated inventory!!! 🎉🎉🎉", inventory);
        }
        return ResponseEntity.badRequest("Bad request check your input!!! ❌❌❌", null);
    }

    @Delete("/hospital/:hospitalId/:inventoryId")
    async deleteInventory (@Param("hospitalId") hospitalId: number, @Param("inventoryId") inventoryId: number): Promise<ResponseEntity<Boolean>> {
        const success: Boolean = await this.inventoryService.deleteInventory(hospitalId, inventoryId);
        return success ?
        ResponseEntity.ok("Successfully deleted inventory!!! 🎉🎉🎉", success) :
        ResponseEntity.notFound("Sorry inventory not found to be deleted!!! 😔💔💔", success);
    }
}