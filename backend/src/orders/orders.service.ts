import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}

  create(itemsJson: string) {
    const o = this.repo.create({ itemsJson });
    return this.repo.save(o);
  }

  findAll() {
    return this.repo.find();
  }
}
