import { Resolver, Query } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private ordersService: OrdersService) {}

  @Query(() => [Order])
  orders() {
    return this.ordersService.findAll();
  }
}
