'use client';

import { OwnerNav } from "../../components/owner-nav";
import { MemberForm } from "@/app/features/owner/components/member-form";

export default function CreateMemberPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <OwnerNav />
      <main className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">新規会員登録</h1>
        <MemberForm />
      </main>
    </div>
  );
} 