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
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
