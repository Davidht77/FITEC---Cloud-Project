import { Body, Controller, Get, Post } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { Feedback } from './schemas/feedback.schema';

@Controller('feedback')
export class FeedbackController {
    constructor(private feedbackService: FeedbackService) {}

    @Post()
    async createFeedback(@Body() feedback: Feedback): Promise<Feedback> {
        const newFeedback = await this.feedbackService.createFeedback(feedback);
        return newFeedback;
    }

    @Get()
    async getAllFeedback(): Promise<Feedback[]> {
        const feedbackList = await this.feedbackService.getAllFeedback();
        return feedbackList;
    }
    
    @Post('delete')
    async deleteFeedback(@Body('feedbackId') feedbackId: string): Promise<null> {
        const deletedFeedback = await this.feedbackService.deleteFeedback(feedbackId);
        return deletedFeedback;
    }
}
