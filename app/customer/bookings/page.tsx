"use client";

import { CustomerNav } from "../components/customer-nav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, X } from "lucide-react";

// 仮のデータ（後でAPIから取得するように変更）
const bookings = [
  {
    id: 1,
    date: "2024年2月1日",
    time: "10:00 - 11:00",
    title: "ヨガ入門",
    location: "スタジオA",
    trainer: "山田先生",
  },
  {
    id: 2,
    date: "2024年2月3日",
    time: "15:00 - 16:00",
    title: "筋力トレーニング",
    location: "スタジオB",
    trainer: "鈴木先生",
  },
];

export default function BookingsList() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerNav />
      <main className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">予約一覧</h1>
          <Button className="bg-sky-500 hover:bg-sky-600" asChild>
            <a href="/customer/schedule">新規予約</a>
          </Button>
        </div>

        <div className="space-y-4">
          {bookings.length === 0 ? (
            <Card className="p-6 text-center text-gray-500">
              予約されたレッスンはありません
            </Card>
          ) : (
            bookings.map((booking) => (
              <Card key={booking.id} className="p-6 bg-white hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 mb-2">{booking.title}</h2>
                      <p className="text-gray-600">担当: {booking.trainer}</p>
                    </div>
                    <div className="flex gap-6">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{booking.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{booking.location}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                    <X className="h-4 w-4 mr-2" />
                    キャンセル
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
} 