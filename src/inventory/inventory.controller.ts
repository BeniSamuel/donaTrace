import { Controller } from "@nestjs/common";
import { InventoryService } from "./inventory.service";

@Controller("/api/donatrace/inventory")
export class InventoryController {
    constructor (private readonly inventoryService: InventoryService) {};

    
}