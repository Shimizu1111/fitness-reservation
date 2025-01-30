"use client";

import { Card } from "@/components/ui/card";
import { CalendarDays, ClipboardList, Settings } from "lucide-react";
import { CustomerNav } from "./components/customer-nav";

export default function CustomerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerNav />
      <main className="container mx-auto p-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">マイページ</h1>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6 bg-white hover:shadow-lg transition-shadow border border-gray-100">
            <div className="flex items-center gap-4">
              <CalendarDays className="h-8 w-8 text-sky-500" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">次回のレッスン</h2>
                <p className="text-gray-600">予約はありません</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-white hover:shadow-lg transition-shadow border border-gray-100">
            <div className="flex items-center gap-4">
              <ClipboardList className="h-8 w-8 text-sky-500" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">予約履歴</h2>
                <p className="text-gray-600">0 件</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-white hover:shadow-lg transition-shadow border border-gray-100">
            <div className="flex items-center gap-4">
              <Settings className="h-8 w-8 text-sky-500" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">通知設定</h2>
                <p className="text-gray-600">メール通知オン</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
} 