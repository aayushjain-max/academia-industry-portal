'use client';
import React, { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <h2 className="text-2xl font-bold text-red-600">Something went wrong!</h2>
      <p className="mt-2 text-slate-600">An unexpected error occurred. Please try again.</p>
      <button onClick={() => reset()} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md">
        Try Again
      </button>
    </div>
  );
}
