import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID, UUID } from "crypto";

@Schema()
export class Employee{
    @ApiProperty()
    @Prop({index: true})
    id: UUID;
    @ApiProperty()
    @Prop({required: true})
    name : string;
    @ApiProperty()
    @Prop({required: true})
    lastName : string;
    @ApiProperty()
    @Prop({required: true})
    age : number;
    @ApiProperty()
    @Prop({required: true})
    email : string;
    @ApiProperty()
    @Prop({required: true})
    phone : string;
    @ApiProperty()
    @Prop({required: true})
    salary : number;
    @ApiProperty()
    @Prop({required: true})
    date_contract : Date;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);