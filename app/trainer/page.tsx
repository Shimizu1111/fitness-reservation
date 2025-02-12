'use client';

import { TrainerNav } from './components/trainer-nav';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

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
}

export default function TrainerDashboard() {
  // 仮のレッスンデータ
  const [todayLessons] = useState<Lesson[]>([
    {
      id: 1,
      date: '2024年2月1日',
      time: '10:00 - 11:00',
      type: 'ヨガ入門',
      participants: [
        { id: 1, name: '田中太郎', isFirstTime: false },
        { id: 2, name: '鈴木花子', isFirstTime: true },
        { id: 3, name: '山本次郎', isFirstTime: false },
      ],
      maxParticipants: 5,
    },
    {
      id: 2,
      date: '2024年2月1日',
      time: '11:30 - 12:30',
      type: 'ピラティス',
      participants: [
        { id: 4, name: '佐藤美咲', isFirstTime: true },
        { id: 5, name: '伊藤健一', isFirstTime: false },
      ],
      maxParticipants: 5,
    },
  ]);

  const [upcomingLessons] = useState<Lesson[]>([
    {
      id: 3,
      date: '2024年2月2日',
      time: '10:00 - 11:00',
      type: 'ヨガ入門',
      participants: [
        { id: 6, name: '高橋和子', isFirstTime: false },
        { id: 7, name: '渡辺隆', isFirstTime: true },
      ],
      maxParticipants: 5,
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <TrainerNav />
      <main className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">ダッシュボード</h1>
        </div>

        {/* 本日のレッスン */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              本日のレッスン
            </h2>
            <Link href="/trainer/lessons">
              <Button
                variant="ghost"
                className="text-sky-600 hover:text-sky-700"
              >
                すべて見る
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {todayLessons.map(lesson => (
              <Card key={lesson.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {lesson.type}
                    </h3>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {lesson.time}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        {lesson.participants.length}/{lesson.maxParticipants}名
                      </div>
                    </div>
                  </div>
                  <Link href={`/trainer/lessons/${lesson.id}`}>
                    <Button variant="outline" size="sm">
                      詳細
                    </Button>
                  </Link>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    参加予定者
                  </h4>
                  <div className="space-y-2">
                    {lesson.participants.map(participant => (
                      <div
                        key={participant.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <span className="text-gray-900">
                            {participant.name}
                          </span>
                          {participant.isFirstTime && (
                            <span className="ml-2 px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">
                              初回
                            </span>
                          )}
                        </div>
                        <Link href={`/trainer/participants/${participant.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-sky-600 hover:text-sky-700"
                          >
                            詳細
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
            {todayLessons.length === 0 && (
              <div className="col-span-2 text-center py-12 text-gray-500">
                本日のレッスンはありません
              </div>
            )}
          </div>
        </div>

        {/* 次回以降のレッスン */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              次回以降のレッスン
            </h2>
            <Link href="/trainer/lessons">
              <Button
                variant="ghost"
                className="text-sky-600 hover:text-sky-700"
              >
                すべて見る
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingLessons.map(lesson => (
              <Card key={lesson.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {lesson.type}
                    </h3>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {lesson.date}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {lesson.time}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        {lesson.participants.length}/{lesson.maxParticipants}名
                      </div>
                    </div>
                  </div>
                  <Link href={`/trainer/lessons/${lesson.id}`}>
                    <Button variant="outline" size="sm">
                      詳細
                    </Button>
                  </Link>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    参加予定者
                  </h4>
                  <div className="space-y-2">
                    {lesson.participants.map(participant => (
                      <div
                        key={participant.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <span className="text-gray-900">
                            {participant.name}
                          </span>
                          {participant.isFirstTime && (
                            <span className="ml-2 px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">
                              初回
                            </span>
                          )}
                        </div>
                        <Link href={`/trainer/participants/${participant.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-sky-600 hover:text-sky-700"
                          >
                            詳細
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
            {upcomingLessons.length === 0 && (
              <div className="col-span-2 text-center py-12 text-gray-500">
                予定されているレッスンはありません
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
