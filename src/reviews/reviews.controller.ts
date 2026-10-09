import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import {ReviewsService} from './reviews.service.js'
import { CreateReviewDto } from './dto/create-review.dto.js';

@Controller('reviews')
export class ReviewsController {
    constructor (private readonly reviewsService: ReviewsService) {}

    @Get()
    getReviews(@Query('bookId') bookId?: string) {
        return this.reviewsService.getReviews(bookId)
    }

    @Post()
    createForBook(@Body() payload: CreateReviewDto) {
        return this.reviewsService.createReviewByBookId(payload);
    }

    @Delete(":id")
    deleteReviewById(@Param('id', ParseIntPipe) id: number)  {
        return this.reviewsService.deleteReviewById(id)
    }

}
