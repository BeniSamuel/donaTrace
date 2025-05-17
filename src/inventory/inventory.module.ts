import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Inventory } from "src/model/inventory.model";
import { InventoryController } from "./inventory.controller";
import { InventoryService } from "./inventory.service";
import { HospitalModule } from "src/hospital/hospital.module";

@Module({
    imports: [TypeOrmModule.forFeature([Inventory]), HospitalModule],
    controllers: [InventoryController],
    providers: [InventoryService],
    exports: [InventoryService]
})
export class InventoryModule {}