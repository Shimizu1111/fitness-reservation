"use client";

import { OwnerNav } from "../components/owner-nav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Users, X, Check } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

// 予約の状態を定義
type ReservationStatus = "confirmed" | "waitlisted" | "cancelled";

interface Reservation {
  id: number;
  date: string;
  time: string;
  lessonType: string;
  customerId: number;
  customerName: string;
  status: ReservationStatus;
  trainer: string;
}

export default function ReservationsPage() {
  // フィルター状態
  const [statusFilter, setStatusFilter] = useState<ReservationStatus | "all">("all");
  
  // 仮の予約データ
  const [reservations] = useState<Reservation[]>([
    {
      id: 1,
      date: "2024年2月1日",
      time: "10:00 - 11:00",
      lessonType: "ヨガ入門",
      customerId: 101,
      customerName: "田中太郎",
      status: "confirmed",
      trainer: "山田先生"
    },
    {
      id: 2,
      date: "2024年2月1日",
      time: "11:00 - 12:00",
      lessonType: "ピラティス",
      customerId: 102,
      customerName: "鈴木花子",
      status: "waitlisted",
      trainer: "佐藤先生"
    },
    {
      id: 3,
      date: "2024年2月2日",
      time: "15:00 - 16:00",
      lessonType: "筋力トレーニング",
      customerId: 103,
      customerName: "山本次郎",
      status: "cancelled",
      trainer: "田中先生"
    }
  ]);

  // ステータスに応じたバッジのスタイルを返す
  const getStatusBadgeStyle = (status: ReservationStatus) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "waitlisted":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
    }
  };

  // ステータスの日本語表示
  const getStatusText = (status: ReservationStatus) => {
    switch (status) {
      case "confirmed":
        return "予約確定";
      case "waitlisted":
        return "キャンセル待ち";
      case "cancelled":
        return "キャンセル済";
    }
  };

  // フィルタリングされた予約リスト
  const filteredReservations = reservations.filter(
    reservation => statusFilter === "all" || reservation.status === statusFilter
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <OwnerNav />
      <main className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">予約管理</h1>
          <div className="flex gap-2">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              onClick={() => setStatusFilter("all")}
            >
              すべて
            </Button>
            <Button
              variant={statusFilter === "confirmed" ? "default" : "outline"}
              onClick={() => setStatusFilter("confirmed")}
              className="text-green-600"
            >
              <Check className="h-4 w-4 mr-2" />
              予約確定
            </Button>
            <Button
              variant={statusFilter === "waitlisted" ? "default" : "outline"}
              onClick={() => setStatusFilter("waitlisted")}
              className="text-yellow-600"
            >
              <Users className="h-4 w-4 mr-2" />
              キャンセル待ち
            </Button>
            <Button
              variant={statusFilter === "cancelled" ? "default" : "outline"}
              onClick={() => setStatusFilter("cancelled")}
              className="text-red-600"
            >
              <X className="h-4 w-4 mr-2" />
              キャンセル済
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredReservations.map((reservation) => (
            <Card key={reservation.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {reservation.lessonType}
                    </h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeStyle(reservation.status)}`}>
                      {getStatusText(reservation.status)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{reservation.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{reservation.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="h-4 w-4" />
                      <span>
                        受講者: 
                        <Link 
                          href={`/owner/customers/${reservation.customerId}`}
                          className="text-sky-600 hover:text-sky-700 hover:underline ml-1"
                        >
                          {reservation.customerName}
                        </Link>
                        <span className="text-gray-400 text-sm ml-1">(ID: {reservation.customerId})</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>担当: {reservation.trainer}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {reservation.status !== "cancelled" && (
                    <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                      キャンセル
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
} 
