import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}
  
  async request({ method, url, body }) {
    try {
      const maybeData = Object.keys(body || {}).length > 0 && { data: body }
      const requestConfig = { method, url, ...maybeData };
      const response$ = this.httpService.request(requestConfig);
      return lastValueFrom(response$)
    } catch(error) {
      const { message, response } = error
      if (response) {
        const { status, data } = response;
        throw new HttpException(data, status);
      }

      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
