'use client';

import { OwnerNav } from '../../../features/owner/components/owner-nav';
import { CustomerList } from '@/features/owner/components/customer-list';

export default function CustomersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <OwnerNav />
      <main className="container mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">会員管理</h1>
        </div>
        <CustomerList />
      </main>
    </div>
  );
}
