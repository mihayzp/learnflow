// components/ui/BackToDashboard.js

'use client';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export function BackToDashboard() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push('/dashboard')}
      className="flex items-center text-white/80 hover:text-white text-sm mt-4 px-4 py-2 rounded border border-white/20 bg-white/10 hover:bg-white/20"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back to Dashboard
    </button>
  );
}
