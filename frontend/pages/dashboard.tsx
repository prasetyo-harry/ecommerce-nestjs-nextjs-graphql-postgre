import { gql, useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';

const PRODUCTS = gql`query Products { products { id title description price stock } }`;
const CREATE = gql`mutation CreateProduct($title:String!,$description:String!,$price:Float!,$stock:Int!){
  createProduct(title:$title,description:$description,price:$price,stock:$stock){
    id title
  }
}`;

export default function Dashboard() {
  const { data, loading, refetch } = useQuery(PRODUCTS);
  const [create] = useMutation(CREATE);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  async function add(e:any){
    e.preventDefault();
    await create({ variables: { title, description, price: parseFloat(title?price:0 as any), stock: parseInt(stock as any) }});
    setTitle(''); setDescription(''); setPrice(0); setStock(0);
    refetch();
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Add Product</h2>
        <form onSubmit={add} className="grid grid-cols-1 gap-2 max-w-md">
          <input className="p-2 border rounded" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" />
          <input className="p-2 border rounded" value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" />
          <input className="p-2 border rounded" value={price} onChange={e=>setPrice(Number(e.target.value))} placeholder="Price" type="number" step="0.01" />
          <input className="p-2 border rounded" value={stock} onChange={e=>setStock(Number(e.target.value))} placeholder="Stock" type="number" />
          <button className="p-2 bg-green-600 text-white rounded">Add</button>
        </form>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Products</h2>
        {loading && <div>Loading...</div>}
        <div className="grid grid-cols-1 gap-3">
          {data?.products?.map((p:any)=>(
            <div key={p.id} className="p-3 bg-white rounded shadow">
              <div className="font-bold">{p.title}</div>
              <div>{p.description}</div>
              <div>Price: {p.price}</div>
              <div>Stock: {p.stock}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
