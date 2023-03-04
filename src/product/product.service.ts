import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import e from 'express';
import { BusinessService } from 'src/business/business.service';
import { Repository } from 'typeorm';
import { ProductDto } from './product.dto';
import { Product } from './product.entity';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private readonly businessService: BusinessService,
  ) {}
  async createProduct(productData: ProductDto, businessId: number) {
    try {
      const business = await this.businessService.findOneById(businessId);
      const product = await this.productsRepository.save(productData);
      product.business = business;
      return this.productsRepository.save(product);
    } catch (error) {
      console.error('Error in ProductService::createProduct', error);
      throw new BadRequestException(
        'There was an error trying create a product',
      );
    }
  }

  async findProducts(businessId: number) {
    const business = await this.businessService.findOneById(businessId);
    return this.productsRepository.findBy({ business: { id: business.id } });
  }
}
