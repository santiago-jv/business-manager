import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ProductDto } from './product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async createProduct(@Body() productData: ProductDto) {
    //TODO: Use businessId from token
    const newProduct = await this.productService.createProduct(productData, 1);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Product created',
      data: { product: newProduct },
    };
  }
  @Get()
  async getProducts() {
    //TODO: Use businessId from token
    const products = await this.productService.findProducts(1);

    return {
      statusCode: HttpStatus.OK,
      message: 'Products found',
      data: { products },
    };
  }
}
