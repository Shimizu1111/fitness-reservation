"use client";

import { Button } from "@/components/ui/button";
import { Dumbbell, Calendar } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function OwnerNav() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/owner" className="flex items-center gap-2">
          <Dumbbell className="h-6 w-6 text-sky-500" />
          <span className="text-lg font-semibold text-gray-800">フィットネス予約 - 管理画面</span>
        </Link>
        <nav className="ml-auto flex gap-4">
          <Button 
            variant="ghost" 
            className={`text-gray-600 hover:text-sky-600 hover:bg-gray-50 ${
              pathname === "/owner" ? "text-sky-600 bg-gray-50" : ""
            }`} 
            asChild
          >
            <Link href="/owner">ダッシュボード</Link>
          </Button>
          <Button 
            variant="ghost" 
            className={`text-gray-600 hover:text-sky-600 hover:bg-gray-50 ${
              pathname === "/owner/reservations" ? "text-sky-600 bg-gray-50" : ""
            }`} 
            asChild
          >
            <Link href="/owner/reservations">予約管理</Link>
          </Button>
          <Button 
            variant="ghost" 
            className={`text-gray-600 hover:text-sky-600 hover:bg-gray-50 ${
              pathname === "/owner/lessons" ? "text-sky-600 bg-gray-50" : ""
            }`} 
            asChild
          >
            <Link href="/owner/lessons">
              <Calendar className="h-4 w-4 mr-2" />
              レッスン管理
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            className={`text-gray-600 hover:text-sky-600 hover:bg-gray-50 ${
              pathname === "/owner/customers" ? "text-sky-600 bg-gray-50" : ""
            }`} 
            asChild
          >
            <Link href="/owner/customers">会員管理</Link>
          </Button>
          <Button 
            variant="ghost" 
            className={`text-gray-600 hover:text-sky-600 hover:bg-gray-50 ${
              pathname === "/owner/analytics" ? "text-sky-600 bg-gray-50" : ""
            }`} 
            asChild
          >
            <Link href="/owner/analytics">分析</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
} 