import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './book.interface.js';
import { UpdateBookDto } from './dto/update-book.dto.js';
import { CreateBookDto } from './dto/create-book.dto.js';
import { AuthorsService } from '../authors/author.service.js'

export interface BookWithAuthor extends Book {
    authorName: string
}
@Injectable()
export class BooksService {

    constructor (private readonly authorsService: AuthorsService) {}

    private readonly books: Book[] = [
        { id: 1, title: 'Кобзар', authorId: 1, year: 1840 },
        { id: 2, title: 'Тигролови', authorId: 2, year: 1944 },
    ];

    private nextId = 3;

    private bookWithAuthor(authorId:number, book: Book) : BookWithAuthor {
        const author =  this.authorsService.getAuthorByIdOrThrow(authorId);
        return {...book, authorName: author.name}
    }
    

    getAllBooks() :BookWithAuthor[]{
        return this.books.map(book => this.bookWithAuthor(book.authorId, book))
    }

    getBookById(id: number) {
        const book = this.books.find(book => book.id === id);
        if (!book) {
            throw new NotFoundException(`Book with id ${id} ot found`)
        }
        return this.bookWithAuthor(book.authorId, book);
    }

    createBook(payload: CreateBookDto) : BookWithAuthor {
        const author = this.authorsService.getAuthorByIdOrThrow(payload.authorId);

        const book: BookWithAuthor = {
            id: this.nextId,
            ...payload,
            authorName:  author.name
        }
        this.nextId += 1;
        this.books.push(book);
        return book;
    }

    updateBook(id: number, payload: UpdateBookDto): BookWithAuthor {
        this.books.map(book => {
            if (book.id === id) {
                return {...book, ...payload}
            }
            return book
        })
        const updatedBook = this.bookWithAuthor(id, this.getBookById(id))
        return updatedBook
    }

    deleteBook (id: number) {
        const index = this.books.findIndex(book => book.id == id);

        if (index === -1) {
            throw new NotFoundException(`Book with id ${id} not found`)
        }
        this.books.splice(index, 1)
    }
}
