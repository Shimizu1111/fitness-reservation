"use client";

import { OwnerNav } from "../components/owner-nav";
import { Button } from "@/components/ui/button";
import { Search, User, Filter } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  totalLessons: number;
  lastLesson: string;
  status: "active" | "inactive";
}

export default function MembersPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [sortField, setSortField] = useState<keyof Member>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  
  // 仮の会員データ
  const [members] = useState<Member[]>([
    {
      id: 1,
      name: "田中太郎",
      email: "tanaka@example.com",
      phone: "090-1234-5678",
      joinDate: "2023年12月1日",
      totalLessons: 15,
      lastLesson: "2024年1月25日",
      status: "active"
    },
    {
      id: 2,
      name: "鈴木花子",
      email: "suzuki@example.com",
      phone: "090-8765-4321",
      joinDate: "2023年11月15日",
      totalLessons: 8,
      lastLesson: "2024年1月20日",
      status: "active"
    },
    {
      id: 3,
      name: "山本次郎",
      email: "yamamoto@example.com",
      phone: "090-9999-8888",
      joinDate: "2023年10月1日",
      totalLessons: 0,
      lastLesson: "-",
      status: "inactive"
    }
  ]);

  // ステータス変更の処理
  const handleStatusChange = async (memberId: number, newStatus: "active" | "inactive") => {
    try {
      // TODO: APIを呼び出してステータスを更新
      console.log(`Updating status for member ${memberId} to ${newStatus}`);
      // 成功時の処理（実際のAPIができたら実装）
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  // 詳細画面への遷移
  const handleViewDetails = (memberId: number) => {
    router.push(`/owner/members/${memberId}`);
  };

  // フィルタリングとソート
  const filteredAndSortedMembers = members
    .filter(member =>
      (statusFilter === "all" || member.status === statusFilter) &&
      (member.name.includes(searchQuery) ||
       member.email.includes(searchQuery) ||
       member.phone.includes(searchQuery))
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const order = sortOrder === "asc" ? 1 : -1;
      
      if (typeof aValue === "number" && typeof bValue === "number") {
        return (aValue - bValue) * order;
      }
      return String(aValue).localeCompare(String(bValue)) * order;
    });

  // ソートの切り替え
  const toggleSort = (field: keyof Member) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <OwnerNav />
      <main className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">会員管理</h1>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="会員を検索..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-md w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-200 rounded-md bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "inactive")}
            >
              <option value="all">すべてのステータス</option>
              <option value="active">アクティブ</option>
              <option value="inactive">非アクティブ</option>
            </select>
            <Button className="bg-sky-500 hover:bg-sky-600">
              新規会員登録
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => toggleSort("name")}>
                    会員名 {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => toggleSort("email")}>
                    メールアドレス {sortField === "email" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    電話番号
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => toggleSort("joinDate")}>
                    入会日 {sortField === "joinDate" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => toggleSort("totalLessons")}>
                    受講回数 {sortField === "totalLessons" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => toggleSort("lastLesson")}>
                    最終受講日 {sortField === "lastLesson" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => toggleSort("status")}>
                    ステータス {sortField === "status" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{member.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {member.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {member.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {member.joinDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {member.totalLessons}回
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {member.lastLesson}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        member.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {member.status === "active" ? "アクティブ" : "非アクティブ"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button 
                        variant="ghost" 
                        className="text-sky-600 hover:text-sky-900"
                        onClick={() => handleViewDetails(member.id)}
                      >
                        詳細
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="text-red-600 hover:text-red-900 ml-2"
                        onClick={() => handleStatusChange(
                          member.id,
                          member.status === "active" ? "inactive" : "active"
                        )}
                      >
                        {member.status === "active" ? "利用停止" : "再開"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
} 
