import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Inventory } from "src/model/inventory.model";
import { InventoryController } from "./inventory.controller";
import { InventoryService } from "./inventory.service";

@Module({
    imports: [TypeOrmModule.forFeature([Inventory])],
    controllers: [InventoryController],
    providers: [InventoryService],
})
export class InventoryModule {}