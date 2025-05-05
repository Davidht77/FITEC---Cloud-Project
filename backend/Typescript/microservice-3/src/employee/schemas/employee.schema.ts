import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { randomUUID, UUID } from "crypto";

@Schema()
export class Employee{
    @Prop({index: true})
    id: UUID;
    @Prop({required: true})
    name : string;
    @Prop({required: true})
    lastName : string;
    @Prop({required: true})
    age : number;
    @Prop({required: true})
    email : string;
    @Prop({required: true})
    phone : string;
    @Prop({required: true})
    salary : number;
    @Prop({required: true})
    date_contract : Date;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);