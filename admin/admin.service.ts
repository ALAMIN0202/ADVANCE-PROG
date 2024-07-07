import { WorkersDto } from "./Dto/workers.dto";
import { AdminDto,AdminLoginDto, AdminMessageDTO } from "./Dto/admin.dto";
import { WorkersEntity } from "./Entity/workers.entity";
import { ModeratorDto} from "./Dto/moderator.dto";
import { Moderator } from "./Entity/moderator.entity";
import { AdminEntity } from "./Entity/admin.entity";
import { ClientsDto } from "./Dto/clients.dto";
import { ClientsEntity } from "./Entity/clients.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AdminService {


    constructor(
        private readonly mailerService: MailerService,
        @InjectRepository(AdminEntity) private adminRepo: Repository<AdminEntity>,
        @InjectRepository(Moderator) private moderatorrepo: Repository<Moderator>,
        @InjectRepository(WorkersEntity)private  workersRepo: Repository<WorkersEntity>,
        @InjectRepository(ClientsEntity)private clientsRepo: Repository<ClientsEntity>,
        
    ) { }


    async adminReg(aminRegInfo: AdminDto): Promise<AdminEntity> {
        const salt = await bcrypt.genSalt();
        aminRegInfo.password = await bcrypt.hash(aminRegInfo.password, salt);

        return this.adminRepo.save(aminRegInfo);
    }

    // async paymenH (paymentInfo:PaymentEntity) : Promise<PaymentEntity> {

    //     return this.adminRepo.save(paymentInfo);
    // }


    async loginAdmin(adminLogininfo: AdminLoginDto) {
        const admin = await this.adminRepo.findOneBy({ email: adminLogininfo.email });
        console.log(admin);
        const isMatch: boolean = await bcrypt.compare(adminLogininfo.password, admin.password);
        console.log(isMatch);
        return isMatch;

    }


    // async uploadAdmin (fileName:string, email:string) {
    //     const admin = await this.adminRepo.findOneBy({email:email});

    //     if (admin) {
    //         admin.filename = fileName;
    //         await this.adminRepo.save(admin);
    //         return "Admin Photo Uploaded!";
    //     }
    //     return "Admin Photo Couldn't be Uploaded!";
    // }



    async findOneByIdmod(id: number): Promise<Moderator> {
        return this.moderatorrepo.findOneById(id);
    }

    async findOneByIdWorkers(id: number): Promise<WorkersEntity> {
        return this.workersRepo.findOneById(id);
    }

    async findOneByIdClients(id: number): Promise<ClientsEntity> {
        return this.clientsRepo.findOneById(id);
    }

    async regModerator(moderatorLogInfo: ModeratorDto, adminEmail: string): Promise<Moderator> {
        const admin = await this.adminRepo.findOneBy({ email: adminEmail });
        moderatorLogInfo.adminID = admin.id;

        return this.moderatorrepo.save(moderatorLogInfo);
    }


    async getManagerByAdminId(adminEmail: string) {
        console.log(adminEmail);
        const admin = await this.adminRepo.findOneBy({ email: adminEmail });
        //return admin;
        const adminId = admin.id;

        return this.adminRepo.find(
            {
                where: { id: adminId },
                relations: { moderator: true }
            }
        )
    }


    //this code only show frontend moderator all data and admin info
    async getModeratorAll(): Promise<Moderator[]> {
        return this.moderatorrepo.find(
            { relations: { admin: true } }
        );
    }


    async getAllWorkers(): Promise<WorkersEntity[]> {
        return this.workersRepo.find(
            { relations: { admin: true } }
        );
    }

    async getClientsAll(): Promise<ClientsEntity[]> {
        return this.clientsRepo.find(
            { relations: { admin: true } }
        );
    }


    async regWorkers(workersLogInfo: ModeratorDto, adminEmail: string): Promise<WorkersEntity> {
        const admin = await this.adminRepo.findOneBy({ email: adminEmail });
        workersLogInfo.adminID = admin.id;

        return this.workersRepo.save(workersLogInfo);
    }


    //all search by admin id
    async getWorkersByAdminId(adminEmail: string) {
        console.log(adminEmail);
        const admin = await this.adminRepo.findOneBy({ email: adminEmail });
        const adminId = admin.id;

        return this.adminRepo.find(
            {
                where: { id: adminId },
                relations: { workers: true }
            }
        )
    }

    async regClients(ClientsLogInfo: ClientsDto, adminEmail: string): Promise<ClientsEntity> {
        const admin = await this.adminRepo.findOneBy({ email: adminEmail });
        ClientsLogInfo.adminID = admin.id;

        return this.clientsRepo.save(ClientsLogInfo);
    }


    async getClientsByAdminId(adminEmail: string) {
        console.log(adminEmail);
        const admin = await this.adminRepo.findOneBy({ email: adminEmail });
        const adminId = admin.id;

        return this.adminRepo.find(
            {
                where: { id: adminId },
                relations: { clients: true }
            }
        )
    }


    async updateAdminInfo(adminUpdateInfo: AdminDto, adminEmail: string): Promise<AdminEntity> {
        const admin = await this.adminRepo.findOneBy({ email: adminEmail });
        adminUpdateInfo.id = admin.id;

        // admin.email = adminUpdateInfo.email;
        const salt = await bcrypt.genSalt();
        adminUpdateInfo.password = await bcrypt.hash(adminUpdateInfo.password, salt);

        await this.adminRepo.update({ id: admin.id }, adminUpdateInfo);
        console.log("update!");
        return this.adminRepo.findOneBy({ id: admin.id });
    }

    async updateModeratorInfo(moderatorUpdateInfo: ModeratorDto, adminEmail: string): Promise<Moderator> {
        const admin = await this.adminRepo.findOneBy({ email: adminEmail });
        moderatorUpdateInfo.adminID = admin.id;

        const salt = await bcrypt.genSalt();
        moderatorUpdateInfo.password = await bcrypt.hash(moderatorUpdateInfo.password, salt);

        await this.moderatorrepo.update({ id: moderatorUpdateInfo.id }, moderatorUpdateInfo);
        console.log("update!");
        return this.moderatorrepo.findOneBy({ id: moderatorUpdateInfo.id });
    }

    async updateWorkersInfo(workersUpdateInfo: WorkersDto, adminEmail: string): Promise<WorkersEntity> {
        const admin = await this.adminRepo.findOneBy({ email: adminEmail });
        workersUpdateInfo.adminID = admin.id;

        const salt = await bcrypt.genSalt();
       workersUpdateInfo .password = await bcrypt.hash(workersUpdateInfo.password, salt);

        await this.workersRepo.update({ id: workersUpdateInfo.id },workersUpdateInfo);
        console.log("update!");
        return this.workersRepo.findOneBy({ id: workersUpdateInfo.id });
    }


    async updateClientsInfo(clientsUpdateInfo: ClientsDto, adminEmail: string): Promise<ClientsEntity> {
        const admin = await this.adminRepo.findOneBy({ email: adminEmail });
        clientsUpdateInfo.adminID = admin.id;

        const salt = await bcrypt.genSalt();
        clientsUpdateInfo.password = await bcrypt.hash(clientsUpdateInfo.password, salt);

        await this.clientsRepo.update({ id: clientsUpdateInfo.id }, clientsUpdateInfo);
        console.log("update!");
        return this.clientsRepo.findOneBy({ id: clientsUpdateInfo.id });
    }



    //all delete service
    async deleteModerator(managerId: number, useremail: string) {
        const moderator = await this.moderatorrepo.findOneBy({ id: managerId })

        // returmoderator;
        const admin = await this.adminRepo.findOneBy({ email: useremail });

        const adminId = admin.id;
        console.log(adminId)
        if (moderator.adminID == adminId) {
            await this.moderatorrepo.delete(managerId);
            return "manager Deleted!";
        } else {
            return adminId;

        }
    }


    async deleteWorkers(travelerId: number, useremail: string) {
        const worker = await this.workersRepo.findOneBy({ id: travelerId });
        const admin = await this.adminRepo.findOneBy({ email: useremail });
        const adminId = admin.id;

        if (worker.adminID == adminId) {
            await this.workersRepo.delete(travelerId);
            return "workers Deleted!";
        } else {
            return "Couldn't Delete!";
        }
    }

    async deleteClients(tourguidId: number, useremail: string) {
        const clients = await this.clientsRepo.findOneBy({ id: tourguidId });
        const admin = await this.adminRepo.findOneBy({ email: useremail });
        const adminId = admin.id;

        if (clients.adminID == adminId) {
            await this.clientsRepo.delete(tourguidId);
            return "Tour Guid Deleted!";
        } else {
            return "Couldn't Delete!";
        }
    }


    async sendMailModerator() {
        await this.mailerService.sendMail({
            to: 'mdabibur123@gmail.com',
            subject: 'hello bro',
            text: 'i am happy s'
        });
        return {message: 'Email sent successfully'};  
    }
    
}