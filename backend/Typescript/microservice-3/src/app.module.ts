<<<<<<< HEAD
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
=======
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from './client/client.module';
import { EmployeeModule } from './employee/employee.module';
import { QuestionModule } from './question/question.module';
import { S3Service } from './s3/s3.service';
import { S3Controller } from './s3/s3.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientController } from './client/client.controller';
import { ClientService } from './client/client.service';
import { FeedbackModule } from './feedback/feedback.module';
@Module({
  imports: [MongooseModule.forRoot('mongodb://mongoadmin:mongopassword@localhost:27017/mydatabase?authSource=admin'), 
    ClientModule, 
    ConfigModule.forRoot({ // Configura ConfigModule aquí
      isGlobal: true, // Esto hace que ConfigService esté disponible en cualquier módulo sin importarlo explícitamente
       envFilePath: '.env', // Especifica explícitamente la ruta si no está en la raíz
    }),
    EmployeeModule, QuestionModule, FeedbackModule],
  controllers: [AppController, S3Controller, ClientController],
  providers: [AppService, S3Service, ConfigService, ClientService],
})
export class AppModule {}
>>>>>>> e89bb9713ec89be9d22a9e827a80c2545fceff7d
