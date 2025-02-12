'use client';

import { Button } from '@/components/ui/button';
import { Dumbbell } from 'lucide-react';
import Link from 'next/link';

export function CustomerNav() {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/customer" className="flex items-center gap-2">
          <Dumbbell className="h-6 w-6 text-sky-500" />
          <span className="text-lg font-semibold text-gray-800">
            フィットネス予約
          </span>
        </Link>
        <nav className="ml-auto flex gap-4">
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-sky-600 hover:bg-gray-50"
            asChild
          >
            <Link href="/customer">マイページ</Link>
          </Button>
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-sky-600 hover:bg-gray-50"
            asChild
          >
            <Link href="/customer/bookings">予約一覧</Link>
          </Button>
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-sky-600 hover:bg-gray-50"
            asChild
          >
            <Link href="/customer/schedule">レッスン予約</Link>
          </Button>
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-sky-600 hover:bg-gray-50"
            asChild
          >
            <Link href="/customer/settings">設定</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
