import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('all')
  getAll() {
    return [
      { name: 'Tee', value: 'Test' },
      { name: 'Dee', value: 'Main' },
      { name: 'Configs', value: process.env },
    ];
  }
}
