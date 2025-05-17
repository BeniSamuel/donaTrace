import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { DonationService } from "./donation.service";
import { ResponseEntity } from "src/utils/response.util";
import { Donation } from "src/model/donation.model";
import { DonationDto } from "src/dto/donation.dto";

@Controller("/api/donatrace/donation")
export class DonationController {
    constructor (private readonly donationService: DonationService) {}

    @Get("/all")
    @HttpCode(HttpStatus.OK)
    async getAllDonations (): Promise<ResponseEntity<Donation[]>> {
        return ResponseEntity.ok("Successfully obtained donation!!! 🎉🎉🎉", await this.donationService.getAllDonations());
    }

    @Get("/user/:userId")
    @HttpCode(HttpStatus.OK || HttpStatus.NOT_FOUND)
    async getDonationByUser (@Param("userId") userId: number): Promise<ResponseEntity<Donation[]>> {
        const donations: Donation[] = await this.donationService.getAllDonationByUser(userId);
        if (donations) {
            return ResponseEntity.ok("Successfully obtained donation by user!!! 🎉🎉🎉", donations);
        }
        return ResponseEntity.notFound("Sorry donations for user not found!!! 😔💔💔", null);
    }

    @Get("/inventory/:inventoryId")
    @HttpCode(HttpStatus.OK || HttpStatus.NOT_FOUND)
    async getDonationByInventory (@Param("inventoryId") inventoryId: number): Promise<ResponseEntity<Donation[]>> {
        const donations: Donation[] = await this.donationService.getAllDonationByInventory(inventoryId);
        if (donations) {
            return ResponseEntity.ok("Successfully obtained donation by user!!! 🎉🎉🎉", donations);
        }
        return ResponseEntity.notFound("Sorry donations for inventory not found!!! 😔💔💔", null)
    }

    @Post("/create")
    @HttpCode(HttpStatus.CREATED || HttpStatus.BAD_REQUEST)
    async createDonation (@Body() donationDto: DonationDto): Promise<ResponseEntity<Donation>> {
        const newDonation = await this.donationService.createDonation(donationDto);
        if (newDonation) {
            return ResponseEntity.created("Successfully created donation!!! 🎉🎉🎉", newDonation);
        }
        return ResponseEntity.badRequest("Bad Request check inform provided!!! ❌❌❌", null);
    }

    @Put("/inventory/:inventoryId/:donationId")
    @HttpCode(HttpStatus.OK || HttpStatus.NOT_FOUND)
    async updateDonation (@Param("inventoryId") inventoryId: number, @Param("donationId") donationId: number, @Body() donationDto: DonationDto): Promise<ResponseEntity<Donation>> {
        const updatedDonation = await this.donationService.updateDonationByInventoryAndId(inventoryId, donationId, donationDto);
        if (updatedDonation) {
            return ResponseEntity.ok("Successfully updated donation!!! 🎉🎉🎉", updatedDonation);
        }
        return ResponseEntity.notFound("Sorry donation not found to be updated!!! 😔💔💔", null);
    }


    @Delete("/:inventoryId")
    @HttpCode(HttpStatus.OK || HttpStatus.NOT_FOUND)
    async deleteDonation (@Param("inventoryId") inventoryId: number): Promise<ResponseEntity<Boolean>> {
        const success = await this.donationService.deleteDonationById(inventoryId);
        return success ? 
        ResponseEntity.ok("Successfully deleted donation!!! 🎉🎉🎉", success) :
        ResponseEntity.notFound("Sorry donation not found!!! 😔💔💔", success);
    }
    
}