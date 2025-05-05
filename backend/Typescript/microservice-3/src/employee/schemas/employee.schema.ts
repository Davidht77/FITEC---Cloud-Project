<<<<<<< HEAD
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

=======
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

>>>>>>> e89bb9713ec89be9d22a9e827a80c2545fceff7d
export const EmployeeSchema = SchemaFactory.createForClass(Employee);