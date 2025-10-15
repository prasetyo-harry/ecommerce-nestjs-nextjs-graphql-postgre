import 'reflect-metadata';
import { DataSource } from 'typeorm';
import ormconfig from './ormconfig';
import { User } from './users/user.entity';
import { Product } from './products/product.entity';
import * as bcrypt from 'bcrypt';

async function run() {
  const ds = new DataSource(ormconfig as any);
  await ds.initialize();
  console.log('Connected to DB, running seed...');

  const userRepo = ds.getRepository(User);
  const productRepo = ds.getRepository(Product);

  const adminEmail = 'admin@example.com';
  const userEmail = 'user@example.com';

  const existingAdmin = await userRepo.findOneBy({ email: adminEmail });
  if (!existingAdmin) {
    const admin = userRepo.create({ email: adminEmail, password: await bcrypt.hash('password',10), role: 'admin' });
    await userRepo.save(admin);
    console.log('Created admin user:', adminEmail);
  }

  const existingUser = await userRepo.findOneBy({ email: userEmail });
  if (!existingUser) {
    const u = userRepo.create({ email: userEmail, password: await bcrypt.hash('password',10), role: 'user' });
    await userRepo.save(u);
    console.log('Created regular user:', userEmail);
  }

  const count = await productRepo.count();
  if (count === 0) {
    const samples = [
      { title: 'Blue T-Shirt', description: 'Comfort cotton tee', price: 19.99, stock: 100 },
      { title: 'Sneakers', description: 'Running shoes', price: 79.99, stock: 50 },
      { title: 'Coffee Mug', description: 'Ceramic mug', price: 9.99, stock: 200 },
      { title: 'Headphones', description: 'Wireless headphones', price: 129.99, stock: 30 },
      { title: 'Backpack', description: 'Travel backpack', price: 49.99, stock: 40 },
    ];
    for (const s of samples) {
      const p = productRepo.create(s as any);
      await productRepo.save(p);
    }
    console.log('Inserted sample products');
  }

  await ds.destroy();
  console.log('Seed finished.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
