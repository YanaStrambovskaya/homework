import { Module } from '@nestjs/common';
import { BooksService } from './books.service.js';
import { BooksController } from './books.controller.js';
import { AuthorsModule } from '../authors/authors.module.js';

// Books own book data
// Books depend on Authors
@Module({
  imports: [AuthorsModule],
  providers: [BooksService],
  controllers: [BooksController],
  exports:[BooksService]
})
export class BooksModule {}
