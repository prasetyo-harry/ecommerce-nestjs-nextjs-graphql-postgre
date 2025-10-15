import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

const REGISTER = gql`mutation register($email:String!,$password:String!){ register(email:$email,password:$password) }`;

export default function Register() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [register, { loading }] = useMutation(REGISTER);
  const router = useRouter();

  async function submit(e:any){
    e.preventDefault();
    try {
      const res = await register({ variables: { email, password } });
      const token = res.data.register;
      localStorage.setItem('token', token);
      router.push('/dashboard');
    } catch(err){
      alert('Register failed');
    }
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Register</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full p-2 border rounded" value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" />
        <input className="w-full p-2 border rounded" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" type="password" />
        <button className="w-full p-2 bg-green-600 text-white rounded" disabled={loading}>Register</button>
      </form>
    </main>
  );
}
