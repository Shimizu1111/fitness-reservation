"use client";

import { OwnerNav } from "../components/owner-nav";
import { MemberList } from "@/app/features/owner/components/member-list";

export default function MembersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <OwnerNav />
      <main className="container mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">会員管理</h1>
        </div>
        <MemberList />
      </main>
    </div>
  );
} 
