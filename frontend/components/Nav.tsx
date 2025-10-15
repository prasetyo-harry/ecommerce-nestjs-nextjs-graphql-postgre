import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Nav() {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  useEffect(()=>{ setToken(typeof window !== 'undefined' ? localStorage.getItem('token') : null); }, [router.pathname]);
  function logout() {
    if (typeof window !== 'undefined') localStorage.removeItem('token');
    router.push('/login');
  }
  return (
    <nav className="bg-white shadow p-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/"  className="font-bold">Ecom</Link>
          <Link href="/dashboard" >Dashboard</Link>
        </div>
        <div>
          {token ? (
            <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
          ) : (
            <Link href="/login"  className="px-3 py-1 bg-blue-500 text-white rounded">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
