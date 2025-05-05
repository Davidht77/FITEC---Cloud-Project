<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './schemas/client.schema';
import { Employee, EmployeeSchema } from 'src/employee/schemas/employee.schema';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
        { name: Client.name, schema: ClientSchema },
        { name: Employee.name, schema: EmployeeSchema }
        ]),
    ],
    controllers: [ClientController],
    providers: [ClientService],
    exports: [MongooseModule],
})
export class ClientModule {}
=======
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './schemas/client.schema';
import { Employee, EmployeeSchema } from 'src/employee/schemas/employee.schema';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
        { name: Client.name, schema: ClientSchema }
        ]),
    ],
    controllers: [ClientController],
    providers: [ClientService],
    exports: [MongooseModule],
})
export class ClientModule {}
>>>>>>> e89bb9713ec89be9d22a9e827a80c2545fceff7d
