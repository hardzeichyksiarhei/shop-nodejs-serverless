import * as dotenv from 'dotenv';

dotenv.config();

// environment
export const NODE_ENV: string = process.env.NODE_ENV || 'development';

// author
export const AUTHOR: string = process.env.AUTHOR || 'hardz';

// application
export const PORT: number = parseInt(process.env.PORT, 10) || 4000;

// remote api
export const API_URL =  {
    PRODUCTS: process.env.API_PRODUCTS_URL || '',
    CART:  process.env.API_CART_URL || '',
}