"use client";

import { Card } from "@/components/ui/card";
import { Users, Calendar, TrendingUp } from "lucide-react";
import { OwnerNav } from "./components/owner-nav";

export default function OwnerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <OwnerNav />
      <main className="container mx-auto p-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">管理ダッシュボード</h1>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6 bg-white hover:shadow-lg transition-shadow border border-gray-100">
            <div className="flex items-center gap-4">
              <Users className="h-8 w-8 text-sky-500" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">会員数</h2>
                <p className="text-gray-600">0 名</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-white hover:shadow-lg transition-shadow border border-gray-100">
            <div className="flex items-center gap-4">
              <Calendar className="h-8 w-8 text-sky-500" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">本日の予約</h2>
                <p className="text-gray-600">0 件</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-white hover:shadow-lg transition-shadow border border-gray-100">
            <div className="flex items-center gap-4">
              <TrendingUp className="h-8 w-8 text-sky-500" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">予約率</h2>
                <p className="text-gray-600">0%</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
} 