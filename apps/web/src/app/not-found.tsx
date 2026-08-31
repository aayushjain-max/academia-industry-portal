import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-extrabold text-slate-900">404</h1>
      <p className="mt-2 text-lg text-slate-600">The page you are looking for does not exist.</p>
      <Link href="/" className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md">
        Return to Home
      </Link>
    </div>
  );
}
