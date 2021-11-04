import { Controller, All, Req, Res, HttpStatus, HttpException } from '@nestjs/common';
import { Response, Request } from 'express';

import { AppService } from './app.service';

import { API_URL } from './environments';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @All('*')
  async root(@Req() req: Request) {
    const { originalUrl, method, body } = req;
    const [_, recipient] = originalUrl.split('/');

    const recipientUrl = API_URL[recipient.toUpperCase()];

    const url = `${recipientUrl}${originalUrl}`;
    if (recipientUrl) return this.appService.request({ method, url, body });
    
    throw new HttpException('Cannot process request', HttpStatus.BAD_GATEWAY);
  }
}
