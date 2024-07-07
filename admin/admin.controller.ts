import { Body, Controller, Delete, Get, NotFoundException, Query, Param, ParseIntPipe, Post, Put, Req, Res, Session, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe, Patch } from "@nestjs/common";
import { AdminDto, AdminLoginDto, AdminMessageDTO } from "./Dto/admin.dto";
import { AdminService } from "./admin.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { SessionGuard } from "./session.gurd";
import { MulterError, diskStorage } from "multer";
import { Multer } from 'multer';

import { ModeratorDto } from "./Dto/moderator.dto";
import { WorkersDto } from "./Dto/workers.dto";
import { ClientsDto } from "./Dto/clients.dto";
import { promises } from "dns";
import { Moderator } from "./Entity/moderator.entity";

import session from "express-session";
import { WorkersEntity } from "./Entity/workers.entity";

import { ClientsEntity } from "./Entity/clients.entity";
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }




    @Get('moderator/:id')
    async findOneByIdmod(@Param('id') id: number) {
        return this.adminService.findOneByIdmod(id);
    }

    @Get('workers/:id')
    async findOneByIdWorkers(@Param('id') id: number) {
        return this.adminService.findOneByIdWorkers(id);
    }


    @Get('getclients/:id')
    async findOneByIdClients(@Param('id') id: number) {
        return this.adminService.findOneByIdClients(id);
    }


    //register admin 
    @Post('register')
    //@UsePipes(new ValidationPipe())
    adminReg(@Body() adminRegInfo: AdminDto, @UploadedFile() imageobj: Express.Multer.File) {
        console.log(adminRegInfo);
        return this.adminService.adminReg(adminRegInfo);
    }

    // admin log in 
    @Post('login')
    //@UsePipes(new ValidationPipe())
    async loginAdmin(@Body() adminLogininfo: AdminLoginDto, @Session() session) {
        console.log(adminLogininfo);
        const admin = await this.adminService.loginAdmin(adminLogininfo);
        if (admin) {
            session.email = adminLogininfo.email;
            return session.email;

        } else {
            return new NotFoundException({ message: "Admin Login Failed!" });
        }


    }

    //upload
    // @Put('upload')
    // @UseGuards(SessionGuard)
    // @UseInterceptors(FileInterceptor('image',
    // {   
    //     fileFilter: (req, file, cb) => {
    //         if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
    //             cb(null, true);
    //         } else {
    //             cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
    //         }
    //     },
    //     limits: { fileSize: 30000000 },
    //     storage:diskStorage({
    //         destination: './uploads',
    //         filename: function (req, file, cb) {
    //             cb(null, Date.now() + file.originalname)
    //         },
    //     })
    // }))
    // uploadAdmin(@UploadedFile() photoObj:Express.Multer.File, @Session() session) {
    //     console.log(photoObj.filename);
    //     const fileName = photoObj.filename;
    //     return this.adminService.uploadAdmin(fileName, session.email);
    // }


    //Add this modertor By admin 
    @Post('register/moderator')
    @UsePipes(new ValidationPipe())
    //@UseGuards(SessionGuard)
    regModerator(@Body() moderatorLogInfo: ModeratorDto, @Session() session) {
        console.log(moderatorLogInfo);
        return this.adminService.regModerator(moderatorLogInfo, session.email);
    }



    //Admin search moderator
    @Get('search/moderator')
    //  @UseGuards(SessionGuard)
    // getManagerByAdminId(@Session() session): any {
    //   return this.adminService.getManagerByAdminId(session.email);

    getManagerByAdminId(@Query('email') adminEmail: string): any {
        return this.adminService.getManagerByAdminId(adminEmail);
    }



    //this code only show frontend manager all data and admin info
    @Get('allmoderator')
    // @UseGuards(SessionGuard)
    getModeratorAll(@Session() session): Promise<Moderator[]> {
        return this.adminService.getModeratorAll();
    }

    /////////////

    @Get('allworkers')
    // @UseGuards(SessionGuard)
    getAllWorkers(): Promise<WorkersEntity[]> {
        return this.adminService.getAllWorkers()
    }

    @Get('allclients')
    // @UseGuards(SessionGuard)
    getClientsAll(@Session() session): Promise<ClientsEntity[]> {
        return this.adminService.getClientsAll();
    }

    /* //Add workwrs By Admin
     @Post('register/workers')
     @UsePipes(new ValidationPipe())
    // @UseGuards(SessionGuard)
     regWorkers(@Body() workersLogInfo: WorkersEntity, @Session() session) {
         console.log(workersLogInfo);
         return this.adminService.regWorkers(workersLogInfo, session.email);
     }
 
     //Admin search workers
     @Get('search/workers')
     @UseGuards(SessionGuard)
     getWorkersByAdminId(@Session() session): any {
         return this.adminService.getWorkersByAdminId(session.email);
     }*/



    // Add workers by admin
    @Post('register/workers')
    @UsePipes(new ValidationPipe())
    regWorkers(@Body() workersLogInfo: WorkersEntity, @Query('email') adminEmail: string) {
        console.log(workersLogInfo);
        return this.adminService.regWorkers(workersLogInfo, adminEmail);
    }

    // Admin search workers
    @Get('search/workers')
    getWorkersByAdminId(@Query('email') adminEmail: string): any {
        return this.adminService.getWorkersByAdminId(adminEmail);
    }



    /* //Add clientBy Admin ID
     @Post('register/clients')
     @UsePipes(new ValidationPipe())
    // @UseGuards(SessionGuard)
     regClients(@Body() clientsLogInfo: ClientsDto, @Session() session) {
         console.log(clientsLogInfo);
         return this.adminService.regClients(clientsLogInfo, session.email);
     }*/


    //Add client By Admin ID
    @Post('register/clients')
    @UsePipes(new ValidationPipe())
    // @UseGuards(SessionGuard)
    regClients(@Body() clientsLogInfo: ClientsDto, @Param('email') userEmail: string) {
        console.log(clientsLogInfo);
        return this.adminService.regClients(clientsLogInfo, userEmail);
    }

    /* //Admin search Tour Guid BY Admin ID
      @Get('search/clients')
     // @UseGuards(SessionGuard)
      getClientsByAdminId(@Session() session): any {
          return this.adminService.getClientsByAdminId(session.email);
      }*/


    //Admin search Tour Guid BY Admin ID
    @Get('search/clients')
    // @UseGuards(SessionGuard)
    getClientsByAdminId(@Query('email') adminEmail: string): any {
        return this.adminService.getClientsByAdminId(adminEmail);
    }

    //Update Admin data
    @Put('updateadmininfo')
    @UsePipes(new ValidationPipe())
    //@UseGuards(SessionGuard)
    updateAdminInfo(@Body() adminUpdateInfo: AdminDto, @Session() session): any {
        console.log(adminUpdateInfo);
        // session.email = adminUpdateInfo.email;
        return this.adminService.updateAdminInfo(adminUpdateInfo, session.email);
    }

    //Update  data
    @Put('updatemoderatorinfo')
    @UsePipes(new ValidationPipe())
    // @UseGuards(SessionGuard)
    updateModaretorInfo(@Body() managerUpdateInfo: ModeratorDto, @Session() session): any {
        console.log(managerUpdateInfo);
        return this.adminService.updateModeratorInfo(managerUpdateInfo, session.email);
    }

    //Update  data
    @Put('updateworkersinfo')
    @UsePipes(new ValidationPipe())
    // @UseGuards(SessionGuard)
    updateWorkersInfo(@Body() workersUpdateInfo: WorkersDto, @Session() session): any {
        console.log(workersUpdateInfo);
        return this.adminService.updateWorkersInfo(workersUpdateInfo, session.email);
    }

    //Update  data
    @Put('updateclientsinfo')
    @UsePipes(new ValidationPipe())
    // @UseGuards(SessionGuard)
    updateClientsInfo(@Body() clientUpdateInfo: ClientsEntity, @Session() session): any {
        console.log(clientUpdateInfo);
        return this.adminService.updateClientsInfo(clientUpdateInfo, session.email);
    }




    @Delete('delete/moderator/:moderatorId')
    // @UseGuards(SessionGuard)
    async deleteModerator(@Param('moderatorId', ParseIntPipe) moderatorId: number, @Session() session): Promise<any> {
        return this.adminService.deleteModerator(moderatorId, session.email);

    }





    @Delete('delete/worker/:worker')
    // @UseGuards(SessionGuard)
    deleteWorkers(@Param('workersId', ParseIntPipe) workersId: number, @Session() session): any {
        return this.adminService.deleteWorkers(workersId, session.email);
    }

    //Delete clients by Admin ID
    @Delete('delete/clientsid/:clientsidId')
    @UseGuards(SessionGuard)
    deleteClients(@Param('clientidId', ParseIntPipe) clientsidId: number, @Session() session): any {
        return this.adminService.deleteClients(clientsidId, session.email);
    }


    //Sent message moderator
    @Post('sent/moderator')
    sendEmail(@Body() data) {
        return this.adminService.sendMailModerator();
    }

    @Post('/adminsignout')
    signout(@Req() req) {
        if (req.session.destroy()) {
            return true;
        }
        else {
            throw new UnauthorizedException("invalid actions");
        }
    }



}