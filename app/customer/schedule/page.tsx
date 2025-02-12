'use client';

import { CustomerNav } from '../components/customer-nav';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Lock, Users } from 'lucide-react';
import { useState } from 'react';

// 日付フォーマット用のヘルパー関数
function formatDate(date: Date): string {
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

// 曜日の配列
const DAYS = ['日', '月', '火', '水', '木', '金', '土'];

// レッスン種類の定義
const LESSON_TYPES = [
  { id: 'yoga', name: 'ヨガ' },
  { id: 'pilates', name: 'ピラティス' },
  { id: 'training', name: '筋力トレーニング' },
];

// トレーナーの定義
const TRAINERS = [
  { id: 'satoko', name: 'SATOKO' },
  { id: 'ken', name: 'KEN' },
  { id: 'mayu', name: 'MAYU' },
];

// 1週間の日付配列を生成する関数
function getWeekDates(
  startDate: Date = new Date()
): Array<{ date: string; day: string; fullDate: Date }> {
  const dates = [];
  const current = new Date(startDate);

  for (let i = 0; i < 7; i++) {
    const date = new Date(current);
    dates.push({
      date: formatDate(date),
      day: DAYS[date.getDay()],
      fullDate: date,
    });
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

// レッスン時間をDateオブジェクトに変換する関数
function getLessonDateTime(date: Date, timeStr: string): Date {
  const [startTime] = timeStr.split(' - ');
  const [hours, minutes] = startTime.split(':').map(Number);
  const lessonDate = new Date(date);
  lessonDate.setHours(hours, minutes, 0, 0);
  return lessonDate;
}

// 仮のデータを生成する関数
function generateWeeklyLessons(
  weekDates: Array<{ date: string; day: string; fullDate: Date }>
) {
  return weekDates.map(({ date, day, fullDate }) => ({
    date,
    day,
    lessons: [
      {
        id: Math.random(),
        time: '10:00 - 10:45',
        trainer: 'SATOKO',
        type: 'ヨガ',
        capacity: 2,
        reserved: 1,
        waitingList: [],
        imageUrl: '/trainers/satoko.jpg',
        datetime: getLessonDateTime(fullDate, '10:00 - 10:45'),
      },
      {
        id: Math.random(),
        time: '11:00 - 11:45',
        trainer: day === '水' ? 'KEN' : 'MAYU',
        type: day === '水' ? '筋力トレーニング' : 'ピラティス',
        capacity: 2,
        reserved: 2,
        waitingList: [],
        imageUrl: day === '水' ? '/trainers/ken.jpg' : '/trainers/mayu.jpg',
        datetime: getLessonDateTime(fullDate, '11:00 - 11:45'),
      },
    ],
  }));
}

export default function SchedulePage() {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const [selectedType, setSelectedType] = useState('');
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const weekDates = getWeekDates(currentWeekStart);
  const weeklyLessons = generateWeeklyLessons(weekDates);

  // 週を移動する関数
  const moveWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeekStart(newDate);
  };

  // 表示用の期間文字列を生成
  const displayPeriod = `${formatDate(weekDates[0].fullDate)} - ${formatDate(weekDates[6].fullDate)}`;

  // レッスンが予約可能かどうかを判定する関数
  const isLessonAvailable = (lessonDateTime: Date): boolean => {
    const now = new Date();
    return lessonDateTime > now;
  };

  // フィルタリングされたレッスンを取得
  const filteredLessons = weeklyLessons.map(day => ({
    ...day,
    lessons: day.lessons.filter(
      lesson =>
        (!selectedType || lesson.type === selectedType) &&
        (!selectedTrainer || lesson.trainer === selectedTrainer)
    ),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerNav />
      <main className="container mx-auto p-8">
        {/* ヘッダー部分 */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">レッスン予約</h1>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => moveWeek('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-lg font-medium">{displayPeriod}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => moveWeek('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* フィルター */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <select
            className="w-full p-2 rounded-md border border-gray-200 bg-white"
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
          >
            <option value="">レッスン種類</option>
            {LESSON_TYPES.map(type => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>

          <select
            className="w-full p-2 rounded-md border border-gray-200 bg-white"
            value={selectedTrainer}
            onChange={e => setSelectedTrainer(e.target.value)}
          >
            <option value="">トレーナー</option>
            {TRAINERS.map(trainer => (
              <option key={trainer.id} value={trainer.name}>
                {trainer.name}
              </option>
            ))}
          </select>
        </div>

        {/* カレンダーグリッド */}
        <div className="grid grid-cols-7 gap-4">
          {filteredLessons.map(day => (
            <div key={day.date} className="space-y-4">
              {/* 日付ヘッダー */}
              <div className="text-center p-2 bg-white rounded-md border border-gray-100">
                <div className="font-medium text-gray-600">{day.date}</div>
                <div className="text-sm text-gray-400">({day.day})</div>
              </div>

              {/* レッスン一覧 */}
              <div className="space-y-2">
                {day.lessons.map(lesson => {
                  const available = isLessonAvailable(lesson.datetime);
                  const isFull = lesson.reserved >= lesson.capacity;
                  return (
                    <Card
                      key={lesson.id}
                      className={`p-4 hover:shadow-md transition-shadow ${!available ? 'opacity-50' : ''}`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                          {/* トレーナーの画像（実際の画像に置き換える必要あり） */}
                          <div className="w-full h-full bg-gray-200"></div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-gray-800">
                            {lesson.trainer}
                          </div>
                          <div className="text-sm text-gray-500">
                            {lesson.time}
                          </div>
                          <div className="text-xs text-gray-400">
                            {lesson.type}
                          </div>
                          <div className="flex items-center justify-center gap-1 text-xs text-gray-400">
                            <Users className="h-3 w-3" />
                            <span>
                              {lesson.reserved}/{lesson.capacity}
                            </span>
                          </div>
                        </div>
                        {!available ? (
                          <Button
                            className="w-full bg-gray-300 cursor-not-allowed text-sm"
                            disabled
                          >
                            <Lock className="h-4 w-4 mr-1" />
                            予約終了
                          </Button>
                        ) : isFull ? (
                          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-sm">
                            キャンセル待ち
                          </Button>
                        ) : (
                          <Button className="w-full bg-sky-500 hover:bg-sky-600 text-sm">
                            予約する
                          </Button>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
