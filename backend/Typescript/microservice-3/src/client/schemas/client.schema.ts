import { randomUUID, UUID } from "crypto";
import { Schema, Prop, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class Client {
    @Prop({default: randomUUID(), index: true})
    id: UUID;
    @Prop( { required: true })
    name : string;
    @Prop({ required: true })
    lastName : string;
    @Prop({ required: true })
    age : number;
    @Prop({ required: true })
    email : string;
    @Prop({ required: true })
    phone : string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);