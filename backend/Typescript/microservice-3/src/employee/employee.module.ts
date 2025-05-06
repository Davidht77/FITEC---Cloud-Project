<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Module({
  providers: [EmployeeService]
})
export class EmployeeModule {}
=======
import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from './schemas/employee.schema';

@Module({
  imports: [
          MongooseModule.forFeature([
          { name: Employee.name, schema: EmployeeSchema }
          ]),
      ],
  providers: [EmployeeService],
  exports: [MongooseModule],
})
export class EmployeeModule {}
>>>>>>> e89bb9713ec89be9d22a9e827a80c2545fceff7d
