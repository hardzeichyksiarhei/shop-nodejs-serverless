import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}
  
  async request({ method, url, body }) {
    const data = Object.keys(body || {}).length > 0 && { data: body }
    const requestConfig = { method, url, ...data };
    const response$ = this.httpService.request(requestConfig);
    return lastValueFrom(response$);
  }
}
