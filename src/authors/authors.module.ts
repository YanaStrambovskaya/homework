import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller.js';
import { AuthorsService } from './author.service.js';

// Authors own author data
// Books depend on Authors
@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService],
  exports: [AuthorsService]
})
export class AuthorsModule {}
