import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from './client/client.module';
import { EmployeeModule } from './employee/employee.module';
@Module({
  imports: [MongooseModule.forRoot('mongodb://mongoadmin:mongopassword@localhost:27017/mydatabase?authSource=admin'), ClientModule, EmployeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
