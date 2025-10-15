import Link from 'next/link';
export default function Home() {
  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to Ecom Starter</h1>
      <p className="mb-4">Use the Dashboard to manage products.</p>
      <Link href="/dashboard"  className="text-blue-600">Go to Dashboard</Link>
    </main>
  );
}
