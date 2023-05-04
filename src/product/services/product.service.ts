import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessService } from 'src/business/services/business.service';
import { Repository } from 'typeorm';
import { ProductDto } from '../data-transfer-objects/product.dto';
import { Product } from '../entities/product.entity';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private readonly businessService: BusinessService,
  ) {}
  async createProduct(productData: ProductDto, businessId: string) {
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

  async findProducts(businessId: string) {
    const business = await this.businessService.findOneById(businessId);
    return this.productsRepository.findBy({ business: { id: business.id } });
  }

  async updateStock(id: string, quantityRequested: number, switcher = 1) {
    const product = await this.productsRepository.findOneBy({
      id,
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    product.quantity = product.quantity - (switcher * quantityRequested);
    await this.productsRepository.save(product);
    return product;
  }
}
