import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { Int } from '@nestjs/graphql';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product])
  products() {
    return this.productsService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Product)
  createProduct(
    @Args('title') title: string,
    @Args('description') description: string,
    @Args('price') price: number,  // Float
    @Args('stock', { type: () => Int }) stock: number,  // <-- change to Int
  ) {
    return this.productsService.create({ title, description, price, stock });
  }
}
