import { randomUUID, UUID } from "crypto";
import { Schema, Prop, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class Client {
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
}

export const ClientSchema = SchemaFactory.createForClass(Client);