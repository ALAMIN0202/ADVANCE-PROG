import { Controller,Req, Get,Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
@UseGuards(AuthGuard('local'))
@Post('auth/login')
async login (@Req() req ){

  return req.user;
}


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
 // @Post('login')
  //@UseGuards(AuthGuard('local'))
  //login():string{
    //return'login rout'
  //}
}
