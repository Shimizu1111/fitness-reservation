"use client";

import { TrainerNav } from "../components/trainer-nav";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Lesson {
  id: number;
  date: string;
  time: string;
  type: string;
  participants: Array<{
    id: number;
    name: string;
    isFirstTime: boolean;
  }>;
  maxParticipants: number;
  status: "upcoming" | "completed" | "cancelled";
}

export default function LessonsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "upcoming" | "completed" | "cancelled">("all");
  
  // 仮のレッスンデータ
  const [lessons] = useState<Lesson[]>([
    {
      id: 1,
      date: "2024年2月1日",
      time: "10:00 - 11:00",
      type: "ヨガ入門",
      participants: [
        { id: 1, name: "田中太郎", isFirstTime: false },
        { id: 2, name: "鈴木花子", isFirstTime: true },
        { id: 3, name: "山本次郎", isFirstTime: false }
      ],
      maxParticipants: 5,
      status: "upcoming"
    },
    {
      id: 2,
      date: "2024年2月1日",
      time: "11:30 - 12:30",
      type: "ピラティス",
      participants: [
        { id: 4, name: "佐藤美咲", isFirstTime: true },
        { id: 5, name: "伊藤健一", isFirstTime: false }
      ],
      maxParticipants: 5,
      status: "upcoming"
    },
    {
      id: 3,
      date: "2024年1月31日",
      time: "10:00 - 11:00",
      type: "ヨガ入門",
      participants: [
        { id: 6, name: "高橋和子", isFirstTime: false },
        { id: 7, name: "渡辺隆", isFirstTime: true }
      ],
      maxParticipants: 5,
      status: "completed"
    },
    {
      id: 4,
      date: "2024年1月31日",
      time: "15:00 - 16:00",
      type: "筋力トレーニング",
      participants: [],
      maxParticipants: 5,
      status: "cancelled"
    }
  ]);

  // ステータスに応じたバッジのスタイルを返す
  const getStatusBadgeStyle = (status: Lesson["status"]) => {
    switch (status) {
      case "upcoming":
        return "bg-sky-100 text-sky-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
    }
  };

  // ステータスの日本語表示
  const getStatusText = (status: Lesson["status"]) => {
    switch (status) {
      case "upcoming":
        return "予定";
      case "completed":
        return "完了";
      case "cancelled":
        return "キャンセル";
    }
  };

  // フィルタリングされたレッスンリスト
  const filteredLessons = lessons.filter(lesson =>
    (statusFilter === "all" || lesson.status === statusFilter) &&
    (lesson.type.includes(searchQuery) ||
     lesson.participants.some(p => p.name.includes(searchQuery)))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <TrainerNav />
      <main className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">レッスン管理</h1>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="レッスンを検索..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-md w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-200 rounded-md bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            >
              <option value="all">すべてのステータス</option>
              <option value="upcoming">予定</option>
              <option value="completed">完了</option>
              <option value="cancelled">キャンセル</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>日付</TableHead>
                <TableHead>時間</TableHead>
                <TableHead>レッスン</TableHead>
                <TableHead>参加者</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLessons.map((lesson) => (
                <TableRow key={lesson.id}>
                  <TableCell>{lesson.date}</TableCell>
                  <TableCell>{lesson.time}</TableCell>
                  <TableCell>{lesson.type}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>{lesson.participants.length}/{lesson.maxParticipants}名</span>
                      {lesson.participants.some(p => p.isFirstTime) && (
                        <span className="px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">
                          初回あり
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeStyle(lesson.status)}`}>
                      {getStatusText(lesson.status)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/trainer/lessons/${lesson.id}`}>
                      <Button variant="outline" size="sm">
                        詳細
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
              {filteredLessons.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    該当するレッスンはありません
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
} 