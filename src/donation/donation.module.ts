import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryModule } from "src/inventory/inventory.module";
import { Donation } from "src/model/donation.model";
import { UserModule } from "src/users/users.module";
import { DonationController } from "./donation.controller";
import { DonationService } from "./donation.service";

@Module({
    imports: [TypeOrmModule.forFeature([Donation]), UserModule, InventoryModule],
    controllers: [DonationController],
    providers: [DonationService]
})
export class DonationModule {}