import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from './client/client.module';
import { EmployeeModule } from './employee/employee.module';
import { QuestionModule } from './question/question.module';
import { S3Service } from './s3/s3.service';
import { S3Controller } from './s3/s3.controller';
@Module({
  imports: [MongooseModule.forRoot('mongodb://mongoadmin:mongopassword@localhost:27017/mydatabase?authSource=admin'), ClientModule, EmployeeModule, QuestionModule],
  controllers: [AppController, S3Controller],
  providers: [AppService, S3Service],
})
export class AppModule {}
