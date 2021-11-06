import { Controller, All, Req, HttpStatus, HttpException, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Request } from 'express';
import { Cache } from 'cache-manager';

import { AppService } from './app.service';

import { API_URL, CACHE_TTL } from './environments';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @All('*')
  async root(@Req() req: Request) {
    const { originalUrl, method, body } = req;
    const [_, recipient] = originalUrl.split('/');

    if (method === 'DELETE' && recipient === 'products') {
      await this.resetCache('GET_PRODUCTS_CACHE');
    }

    const shouldUseCache = method === 'GET' && recipient === 'products';
    const cacheProducts = await this.cacheManager.get('GET_PRODUCTS_CACHE');
    if (shouldUseCache && cacheProducts) return cacheProducts;

    const recipientUrl = API_URL[recipient.toUpperCase()];

    const url = `${recipientUrl}${originalUrl}`;
    if (recipientUrl) {
      const { data } = await this.appService.request({ method, url, body });
      if (shouldUseCache && !cacheProducts) {
        await this.cacheManager.set('GET_PRODUCTS_CACHE', data, { ttl: CACHE_TTL });
      }
      return data;
    }
    
    throw new HttpException('Cannot process request', HttpStatus.BAD_GATEWAY);
  }

  async resetCache(key) {
    await this.cacheManager.del(key);
  }
}
