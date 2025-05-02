import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Question {
    @Prop({ required: true })
    question: string;

    @Prop({ required: true })
    answer: string;

    @Prop({ required: true, index: true }) // Indicar index: true para consultas rápidas por category_slug
    category_slug: string;

    @Prop({ required: true })
    category_name: string;

    @Prop({ type: Number })
    order?: number; // Usamos '?' porque puede ser opcional
}

export const QuestionSchema = SchemaFactory.createForClass(Question);