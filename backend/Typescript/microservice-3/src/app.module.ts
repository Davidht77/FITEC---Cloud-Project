import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from './client/client.module';
import { EmployeeModule } from './employee/employee.module';
import { QuestionModule } from './question/question.module';
@Module({
  imports: [MongooseModule.forRoot('mongodb://mongoadmin:mongopassword@localhost:27017/mydatabase?authSource=admin'), ClientModule, EmployeeModule, QuestionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
