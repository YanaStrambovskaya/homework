import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { AuthorsService } from './author.service.js'
import { CreateAuthorDto } from './dto/create-author.dto.js';
import { UpdateAuthorDto } from './dto/update-author.dto.js';

@Controller('authors')
export class AuthorsController {
    constructor(private readonly authorsService: AuthorsService) {

    }

    @Get()
    getAllAuthors() {
        return this.authorsService.getAllAuthors();
    }

    @Get(':id')
    getAuthorById(@Param('id', ParseIntPipe) id: number) {
        return this.authorsService.getAuthorByIdOrThrow(id);
    }

    @Post()
    createAuthor(@Body() payload: CreateAuthorDto) {
        return this.authorsService.createAuthor(payload);
    }
    @Patch(':id')
    updateAuthor(@Param('id', ParseIntPipe) id: number, payload: UpdateAuthorDto) {
        return this.authorsService.updateAuthor(id, payload);
    }

    @Delete(':id')
    deleteAuthor(@Param('id', ParseIntPipe) id:number) {
        return this.authorsService.deleteAuthor(id);
    }
}
