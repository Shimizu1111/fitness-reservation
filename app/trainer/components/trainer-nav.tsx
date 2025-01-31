"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export function TrainerNav() {
  const pathname = usePathname();

  const navigation = [
    { name: "ダッシュボード", href: "/trainer", icon: Home },
    { name: "レッスン管理", href: "/trainer/lessons", icon: Calendar },
  ];

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/trainer" className="text-xl font-bold text-gray-900">
              フィットネス予約（トレーナー）
            </Link>
          </div>
          <nav className="flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "text-sky-600"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
} 