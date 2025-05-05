import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { randomUUID, UUID } from "crypto";

@Schema()
export class Feedback {
    @Prop({ default: randomUUID(), required: true })
    feedbackId: UUID;
    @Prop({ required: true })
    clientId: UUID;
    @Prop({ required: true })
    rating: number;
    @Prop({ required: true })
    comment: string;
    @Prop({ required: true })
    createdAt: Date;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);