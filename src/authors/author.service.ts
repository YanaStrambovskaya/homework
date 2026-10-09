import { Injectable, NotFoundException } from '@nestjs/common';
import {Author} from  './authors.interface.js'
import { CreateAuthorDto } from './dto/create-author.dto.js';
import { UpdateAuthorDto } from './dto/update-author.dto.js';

@Injectable()
export class AuthorsService {
// GET    /authors
// GET    /authors/:id
// POST   /authors
// PUT    /authors/:id
// DELETE /authors/:id
private readonly authors: Author[] = [
    { id: 1, name: 'Тарас Шевченко', country: 'Україна' },
    { id: 2, name: 'Іван Багряний', country: 'Україна' },
  ];

  private nextId = 3;

  getAllAuthors() {
    return this.authors;
  }

  getAuthorByIdOrThrow(id: number) {
    const author = this.authors.find(author => author.id === id);
    if (!author) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
    return author
  }

  createAuthor(payload: CreateAuthorDto) {
    const id = this.nextId;
    this.nextId += 1;
    return this.authors.push({id, ...payload});
  }

  updateAuthor(id: number, payload: UpdateAuthorDto) {
    return this.authors.map(author => {
      if (author.id === id) {
        return {...author, ...payload}
      }
      return author
    }) 
  }

  deleteAuthor(id: number) {
    const index = this.authors.findIndex(author => author.id === id);

    if (index === -1) {

    }
    return this.authors.splice(index, 1);
  }
}
