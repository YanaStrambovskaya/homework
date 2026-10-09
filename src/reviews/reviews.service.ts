import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Review } from './review.interface.js'
import { CreateReviewDto } from './dto/create-review.dto.js';
import { BooksService } from '../books/books.service.js';

@Injectable()
export class ReviewsService {
    constructor (private readonly booksService: BooksService) {}
    private readonly reviews: Review[] = [
        {
            id: 1,
            bookId: 1,
            text: 'Сильна поезія, яка залишається актуальною.',
            rating: 5,
        },
        {
            id: 2,
            bookId: 1,
            text: 'Деякі твори складні для розуміння, але варті уваги.',
            rating: 4,
        },
        {
            id: 3,
            bookId: 2,
            text: 'Захоплива історія про сміливість і свободу.',
            rating: 5,
        },
        {
            id: 4,
            bookId: 2,
            text: 'Цікаві персонажі, хоча початок трохи повільний.',
            rating: 4,
        },
        {
            id: 5,
            bookId: 2,
            text: 'Сподобалася атмосфера, але сюжет не дуже захопив.',
            rating: 3,
        },
    ];

    private nextId = 6;

    getReviews(bookId?: string) : Review[] {
        if (bookId !== undefined) {
            const reviews = this.reviews.filter(review => review.bookId === +bookId);
            return reviews.length ? reviews : []
        }
        return this.reviews
    }

    createReviewByBookId(payload: CreateReviewDto) : Review{
        this.booksService.getBookById(payload.bookId);

        if (
            !Number.isInteger(payload.rating) ||
            payload.rating < 1 ||
            payload.rating > 5
        ) {
            throw new BadRequestException(
                'Rating must be an integer between 1 and 5',
            );
        }

        const review: Review = {
            id: this.nextId,
            bookId: payload.bookId,
            text: payload.text,
            rating: payload.rating
        }

        this.nextId += 1;
        this.reviews.push(review)
        return review
    }

    deleteReviewById(id:number) {
        const index = this.reviews.findIndex(review => review.id === id);
        if (index === -1) {
            throw new NotFoundException(`Review with id ${id} not found`)
        }
        this.reviews.splice(index, 1);
    }
}
