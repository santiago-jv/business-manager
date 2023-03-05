import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProductDto } from './product.dto';
import { ProductService } from './product.service';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateProductSpecsV1, ProductListSpecsV1 } from './product.specs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthRequest } from 'src/auth/interfaces/jwt-payload.interface';
@ApiTags('Products')
@Controller('v1/products')
export class ProductController {
  constructor(private productService: ProductService) {}
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse(CreateProductSpecsV1.Response)
  async createProduct(
    @Body() productData: ProductDto,
    @Request() request: AuthRequest,
  ) {
    const newProduct = await this.productService.createProduct(
      productData,
      request.user.businessId,
    );

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Product created',
      data: { product: newProduct },
    };
  }
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse(ProductListSpecsV1.Response)
  async getProducts(@Request() request: AuthRequest) {
    const products = await this.productService.findProducts(
      request.user.businessId,
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'Products found',
      data: { products },
    };
  }
}
