"use client";

import { CustomerNav } from "../components/customer-nav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// 仮のデータ（後でAPIから取得するように変更）
const weeklyLessons = [
  {
    date: "12/19",
    day: "火",
    lessons: [
      {
        id: 1,
        time: "10:00 - 10:45",
        trainer: "SATOKO",
        type: "セミパーソナル",
        capacity: "0/2",
        imageUrl: "/trainers/satoko.jpg"
      },
      {
        id: 2,
        time: "11:00 - 11:45",
        trainer: "MAYU",
        type: "セミパーソナル",
        capacity: "0/2",
        imageUrl: "/trainers/mayu.jpg"
      }
    ]
  },
  {
    date: "12/20",
    day: "水",
    lessons: [
      {
        id: 3,
        time: "11:00 - 11:45",
        trainer: "KEN",
        type: "セミパーソナル",
        capacity: "0/2",
        imageUrl: "/trainers/ken.jpg"
      }
    ]
  },
  {
    date: "12/21",
    day: "木",
    lessons: [
      {
        id: 4,
        time: "10:00 - 10:45",
        trainer: "KEN",
        type: "セミパーソナル",
        capacity: "0/2",
        imageUrl: "/trainers/ken.jpg"
      },
      {
        id: 5,
        time: "11:00 - 11:45",
        trainer: "KEN",
        type: "セミパーソナル",
        capacity: "0/2",
        imageUrl: "/trainers/ken.jpg"
      }
    ]
  },
  {
    date: "12/22",
    day: "金",
    lessons: [
      {
        id: 6,
        time: "10:00 - 10:45",
        trainer: "SATOKO",
        type: "セミパーソナル",
        capacity: "0/2",
        imageUrl: "/trainers/satoko.jpg"
      },
      {
        id: 7,
        time: "11:00 - 11:45",
        trainer: "SATOKO",
        type: "セミパーソナル",
        capacity: "0/2",
        imageUrl: "/trainers/satoko.jpg"
      }
    ]
  },
  {
    date: "12/23",
    day: "土",
    lessons: [
      {
        id: 8,
        time: "10:00 - 10:45",
        trainer: "SATOKO",
        type: "セミパーソナル",
        capacity: "0/2",
        imageUrl: "/trainers/satoko.jpg"
      },
      {
        id: 9,
        time: "11:00 - 11:45",
        trainer: "MAYU",
        type: "セミパーソナル",
        capacity: "0/2",
        imageUrl: "/trainers/mayu.jpg"
      }
    ]
  },
  {
    date: "12/24",
    day: "日",
    lessons: [
      {
        id: 10,
        time: "10:00 - 10:45",
        trainer: "KEN",
        type: "セミパーソナル",
        capacity: "0/2",
        imageUrl: "/trainers/ken.jpg"
      },
      {
        id: 11,
        time: "11:00 - 11:45",
        trainer: "KEN",
        type: "セミパーソナル",
        capacity: "0/2",
        imageUrl: "/trainers/ken.jpg"
      }
    ]
  },
  {
    date: "12/25",
    day: "月",
    lessons: [
      {
        id: 12,
        time: "10:00 - 10:45",
        trainer: "SATOKO",
        type: "セミパーソナル",
        capacity: "0/2",
        imageUrl: "/trainers/satoko.jpg"
      },
      {
        id: 13,
        time: "11:00 - 11:45",
        trainer: "SATOKO",
        type: "セミパーソナル",
        capacity: "0/2",
        imageUrl: "/trainers/satoko.jpg"
      }
    ]
  }
];

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerNav />
      <main className="container mx-auto p-8">
        {/* ヘッダー部分 */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">レッスン予約</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-lg font-medium">12/19 - 12/25</span>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* カレンダーグリッド */}
        <div className="grid grid-cols-7 gap-4">
          {weeklyLessons.map((day) => (
            <div key={day.date} className="space-y-4">
              {/* 日付ヘッダー */}
              <div className="text-center p-2 bg-white rounded-md border border-gray-100">
                <div className="font-medium text-gray-600">{day.date}</div>
                <div className="text-sm text-gray-400">({day.day})</div>
              </div>

              {/* レッスン一覧 */}
              <div className="space-y-2">
                {day.lessons.map((lesson) => (
                  <Card key={lesson.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                        {/* トレーナーの画像（実際の画像に置き換える必要あり） */}
                        <div className="w-full h-full bg-gray-200"></div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-gray-800">{lesson.trainer}</div>
                        <div className="text-sm text-gray-500">{lesson.time}</div>
                        <div className="text-xs text-gray-400">{lesson.type}</div>
                        <div className="text-xs text-gray-400">{lesson.capacity}</div>
                      </div>
                      <Button className="w-full bg-sky-500 hover:bg-sky-600 text-sm">
                        予約する
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 
