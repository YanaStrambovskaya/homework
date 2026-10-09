import { Body, Post, Controller, Get, Param , ParseIntPipe, Patch, Delete} from '@nestjs/common';
import { BooksService } from './books.service.js';
import { Book } from './book.interface.js';
import { CreateBookDto } from './dto/create-book.dto.js';
import { UpdateBookDto } from './dto/update-book.dto.js';

@Controller('books')
export class BooksController {
    constructor(private readonly bookService: BooksService) {}
    // GET /books
    // GET /books/:id
    // POST /books
    // UPDATE /books/:id
    // DELETE /books/:id

    @Get()
    getAllBooks() {
        return this.bookService.getAllBooks();
    }

    @Get(':id')
    getBookById(@Param('id' , ParseIntPipe) id: number) {
        return this.bookService.getBookById(id);
    }

    @Post()
    createBook(@Body() book: CreateBookDto) {
        return this.bookService.createBook(book);
    }

    @Patch(":id")
    updateBook(@Param('id', ParseIntPipe) id: number, payload: UpdateBookDto) {
        return this.bookService.updateBook(id, payload);
    }

    @Delete(":id")
    deleteBook(@Param('id', ParseIntPipe) id: number) {
        return this.bookService.deleteBook(id);
    }
}
