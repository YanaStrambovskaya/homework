import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // parameter property stores it in the this.appService

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
