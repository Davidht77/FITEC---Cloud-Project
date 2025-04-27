import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { randomUUID, UUID } from "crypto";

@Schema()
export class Employee{
    @Prop({default: randomUUID()})
    id: UUID;
    @Prop()
    name : string;
    @Prop()
    lastName : string;
    @Prop()
    age : number;
    @Prop()
    email : string;
    @Prop()
    phone : string;
    salary : number;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);