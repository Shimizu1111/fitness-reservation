'use client';

import { Card } from '@/components/ui/card';
import { CalendarDays, ClipboardList, Settings } from 'lucide-react';
import { CustomerNav } from './components/customer-nav';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// 型定義
interface NextLesson {
  date: string;
  time: string;
  title: string;
  trainer: string;
}

interface BookingHistory {
  count: number;
  recentBookings: Array<{
    date: string;
    title: string;
  }>;
}

interface NotificationStatus {
  email: boolean;
  notifications: {
    reservation: boolean;
    cancellation: boolean;
    waitingList: boolean;
  };
}

export default function CustomerDashboard() {
  // 状態管理
  const [nextLesson, setNextLesson] = useState<NextLesson | null>(null);
  const [bookingHistory, setBookingHistory] = useState<BookingHistory>({
    count: 0,
    recentBookings: [],
  });
  const [notificationStatus, setNotificationStatus] =
    useState<NotificationStatus>({
      email: true,
      notifications: {
        reservation: true,
        cancellation: true,
        waitingList: true,
      },
    });

  // データ取得
  useEffect(() => {
    // TODO: APIからデータを取得する
    // 仮のデータをセット
    setNextLesson({
      date: '2024年2月1日',
      time: '10:00 - 11:00',
      title: 'ヨガ入門',
      trainer: '山田先生',
    });

    setBookingHistory({
      count: 5,
      recentBookings: [
        { date: '2024年1月25日', title: 'ピラティス' },
        { date: '2024年1月20日', title: 'ヨガ入門' },
      ],
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerNav />
      <main className="container mx-auto p-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">マイページ</h1>
        <div className="grid gap-6 md:grid-cols-3">
          {/* 次回のレッスン */}
          <Link href="/customer/bookings">
            <Card className="p-6 bg-white hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-center gap-4">
                <CalendarDays className="h-8 w-8 text-sky-500" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    次回のレッスン
                  </h2>
                  {nextLesson ? (
                    <div className="text-gray-600">
                      <p className="font-medium">{nextLesson.title}</p>
                      <p className="text-sm">{nextLesson.date}</p>
                      <p className="text-sm">{nextLesson.time}</p>
                      <p className="text-sm">担当: {nextLesson.trainer}</p>
                    </div>
                  ) : (
                    <p className="text-gray-600">予約はありません</p>
                  )}
                </div>
              </div>
            </Card>
          </Link>

          {/* 予約履歴 */}
          <Link href="/customer/bookings">
            <Card className="p-6 bg-white hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-center gap-4">
                <ClipboardList className="h-8 w-8 text-sky-500" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    予約履歴
                  </h2>
                  {bookingHistory.count > 0 ? (
                    <div className="text-gray-600">
                      <p className="font-medium">全{bookingHistory.count}件</p>
                      <div className="text-sm mt-1">
                        {bookingHistory.recentBookings.map((booking, index) => (
                          <p key={index}>
                            {booking.date}: {booking.title}
                          </p>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600">0 件</p>
                  )}
                </div>
              </div>
            </Card>
          </Link>

          {/* 通知設定 */}
          <Link href="/customer/settings">
            <Card className="p-6 bg-white hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-center gap-4">
                <Settings className="h-8 w-8 text-sky-500" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    通知設定
                  </h2>
                  <div className="text-gray-600">
                    <p>
                      {notificationStatus.email
                        ? 'メール通知オン'
                        : 'メール通知オフ'}
                    </p>
                    <p className="text-sm">
                      {
                        Object.values(notificationStatus.notifications).filter(
                          Boolean
                        ).length
                      }
                      種類の通知が有効
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}
