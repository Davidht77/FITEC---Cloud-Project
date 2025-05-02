import { Controller, Get, Param, Query } from '@nestjs/common';
import { Question } from './schema/question.schema';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
    constructor(private questionService: QuestionService){}

    @Get()
    getAll(): Promise<Question[]> {
        return this.questionService.getAllQuestions();
    }

    @Get()
    getByCategory(@Query('slug') slug : string): Promise<Question[]> {
        return this.questionService.getQuestionByCategorySlug(slug);
    }

    @Get()
    getUniqueCategories(@Query('slug') slug: string, @Query('name') name: string): Promise<Question[]> {
        return this.questionService.getUniqueQuestions(slug, name);
    }
}
