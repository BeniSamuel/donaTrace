import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./model/user.model";
import { Donation } from "./model/donation.model";
import { Inventory } from "./model/inventory.model";
import { Hospital } from "./model/hospital.model";
import { UserModule } from "./users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { HospitalModule } from "./hospital/hospital.module";
import { InventoryModule } from "./inventory/inventory.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: "&4!0!BeNi@Ish#123*$!!"
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "beni@ish",
      database: "donatrace",
      entities: [User, Donation, Inventory, Hospital],
      synchronize: true
    }),
    AuthModule,
    UserModule,
    HospitalModule,
    InventoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
