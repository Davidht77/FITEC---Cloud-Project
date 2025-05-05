import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { Feedback } from './schemas/feedback.schema';

@Controller('feedback')
export class FeedbackController {
    constructor(private feedbackService: FeedbackService) {}

    //Add exceptions for each method

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

    @Delete()
    async deleteFeedback(@Query('feedbackId') feedbackId: string): Promise<null> {
        const deletedFeedback = await this.feedbackService.deleteFeedback(feedbackId);
        return deletedFeedback;
    }

    @Get('client')
    async getFeedbackByClientId(@Query('clientId') clientId: string): Promise<Feedback[]> {
        const feedbackList = await this.feedbackService.getFeedbackByClientId(clientId);
        return feedbackList;
    }
}
