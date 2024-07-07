import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { UserModule } from './user/user.module';
//import { APP_GUARD } from '@nestjs/core'; 
//import { SessionGuard } from './admin/session.gurd';
import { AdminModule } from './admin/admin.module'; // Import other modules as needed

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // or any other supported type
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Alamin@1234',
      database: 'every',
      autoLoadEntities: true,
      synchronize: true, // Make sure this is set to false in production for safety
    }),
    AdminModule // Import other modules as needed
  ],

})
export class AppModule {}
