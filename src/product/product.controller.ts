import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ProductDto } from './product.dto';
import { ProductService } from './product.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateProductSpecsV1, ProductListSpecsV1 } from './product.specs';
@ApiTags('Products')
@Controller('v1/products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @ApiResponse(CreateProductSpecsV1.Response)
  async createProduct(@Body() productData: ProductDto) {
    //TODO: Use businessId from token
    const newProduct = await this.productService.createProduct(
      productData,
      '9b83514c-7446-4cf6-b59e-233e04cd19e9',
    );

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Product created',
      data: { product: newProduct },
    };
  }

  @Get()
  @ApiResponse(ProductListSpecsV1.Response)
  async getProducts() {
    //TODO: Use businessId from token
    const products = await this.productService.findProducts('wdef');

    return {
      statusCode: HttpStatus.OK,
      message: 'Products found',
      data: { products },
    };
  }
}
