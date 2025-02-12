'use client';

import { OwnerNav } from '../../../../features/owner/components/owner-nav';
import { CustomerForm } from '@/features/owner/components/customer-form';

export default function CreateCustomerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <OwnerNav />
      <main className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">新規会員登録</h1>
        <CustomerForm />
      </main>
    </div>
  );
}
