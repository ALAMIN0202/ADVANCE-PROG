import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { WorkersEntity } from "./Entity/workers.entity";
import { AdminEntity } from "./Entity/admin.entity";
import { Moderator } from "./Entity/moderator.entity";
import { ClientsEntity } from "./Entity/clients.entity";
import { MailerModule } from "@nestjs-modules/mailer";

import { TypeOrmModule } from "@nestjs/typeorm";
/*
@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity, ManagerEntity, TravelerEntity, TourGuidEntity]),
    MailerModule.forRoot() // Ensure MailerModule is correctly imported and configured
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}*/

@Module({
    imports: [TypeOrmModule.forFeature([AdminEntity, Moderator, WorkersEntity, ClientsEntity]),
    MailerModule.forRoot(
        {
            transport: {
                host: 'smtp.gmail.com',//465
                port: 465,
                ignoreTLS: true,
                secure: true,
                auth: {
                    user: 'alamin1021211@gmail.com',
                    pass: 'zmfd fykx bfns gzdn'
                }
            }
        })
    ],
    controllers: [AdminController],
    providers: [AdminService]
})
export class AdminModule { }