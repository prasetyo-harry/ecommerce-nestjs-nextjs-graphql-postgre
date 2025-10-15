import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

const LOGIN = gql`mutation login($email:String!,$password:String!){ login(email:$email,password:$password) }`;

export default function Login() {
  const [email,setEmail]=useState('admin@example.com');
  const [password,setPassword]=useState('password');
  const [login, { loading }] = useMutation(LOGIN);
  const router = useRouter();

  async function submit(e:any){
    e.preventDefault();
    try {
      const res = await login({ variables: { email, password } });
      const token = res.data.login;
      localStorage.setItem('token', token);
      router.push('/dashboard');
    } catch(err){
      alert('Login failed');
    }
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full p-2 border rounded" value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" />
        <input className="w-full p-2 border rounded" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" type="password" />
        <button className="w-full p-2 bg-blue-600 text-white rounded" disabled={loading}>Login</button>
      </form>
    </main>
  );
}
