import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DonationDto } from "src/dto/donation.dto";
import { InventoryService } from "src/inventory/inventory.service";
import { Donation } from "src/model/donation.model";
import { UserService } from "src/users/users.service";
import { Repository } from "typeorm";

@Injectable()
export class DonationService {
    constructor (
        @InjectRepository(Donation) private readonly donationRepository: Repository<Donation>,
        private readonly userService: UserService,
        private readonly inventoryService: InventoryService
    ) {}

    getAllDonations (): Promise<Donation[]> {
        return this.donationRepository.find();
    }

    async getAllDonationByUser (userid: number): Promise<Donation[]> {
        const user = await this.userService.getUserById(userid);
        if (user) {
            return this.donationRepository.find({where: {
                donor: user
            }});
        } 
        return null;
    }

    async getAllDonationByInventory (inventoryId: number): Promise<Donation[]> {
        const inventory = await this.inventoryService.getInventoryById(inventoryId);
        if (inventory) {
            return this.donationRepository.find({where: {
                inventory: inventory
            }});
        }
        return null;
    }

    getDonationById (id: number): Promise<Donation> {
        return this.donationRepository.findOne({where: {id}});
    }

    async createDonation (donationDto: DonationDto): Promise<Donation> {
        const user = await this.userService.getUserById(donationDto.donor_id);
        if (!user) { return null; }

        const inventory = await this.inventoryService.getInventoryById(donationDto.inventory_id);
        if (!inventory) { return null; }

        const newDonation = new Donation (user, donationDto.blood_type, donationDto.volume, donationDto.donateAt, inventory);
        return this.donationRepository.save(newDonation);
    }

    async updateDonationByInventoryAndId (inventoryId: number, donationId: number, donationDto: DonationDto): Promise<Donation> {
        const inventory = await this.inventoryService.getInventoryById(inventoryId);
        if (!inventory) return null;

        const user = await this.userService.getUserById(donationDto.donor_id);
        if (!user) return null;

        const newInventory = await this.inventoryService.getInventoryById(donationDto.inventory_id);
        if (!newInventory) return null;

        const donation = await this.donationRepository.findOne({where: {
            id: donationId,
            inventory: inventory
        }})

        donation.bloodType = donationDto.blood_type;
        donation.donatedAt = donationDto.donateAt;
        donation.donor = user;
        donation.volume = donationDto.volume;
        donation.inventory = newInventory;

        return this.donationRepository.save(donation);
    }

    async deleteDonationById (id: number): Promise<Boolean> {
        const donation = await this.getDonationById(id);
        if (donation) {
            this.donationRepository.delete(donation);
            return true;
        }
        return false;
    }
}