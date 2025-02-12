'use client';

import { OwnerNav } from '../../../../features/owner/components/owner-nav';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, Calendar, Clock, TrendingUp } from 'lucide-react';
import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface CustomerDetails {
  id: number;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  totalLessons: number;
  lastLesson: string;
  status: 'active' | 'inactive';
  attendanceRate: number;
  upcomingReservations: Array<{
    id: number;
    date: string;
    time: string;
    lessonType: string;
  }>;
  recentLessons: Array<{
    id: number;
    date: string;
    time: string;
    lessonType: string;
    attended: boolean;
  }>;
}

export default function CustomerDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<'suspend' | 'resume'>('suspend');

  // 仮の会員詳細データ
  const [customerDetails] = useState<CustomerDetails>({
    id: parseInt(id),
    name: '田中太郎',
    email: 'tanaka@example.com',
    phone: '090-1234-5678',
    joinDate: '2023年12月1日',
    totalLessons: 15,
    lastLesson: '2024年1月25日',
    status: 'active',
    attendanceRate: 85,
    upcomingReservations: [
      {
        id: 1,
        date: '2024年2月1日',
        time: '10:00 - 11:00',
        lessonType: 'ヨガ入門',
      },
      {
        id: 2,
        date: '2024年2月3日',
        time: '11:00 - 12:00',
        lessonType: 'ピラティス',
      },
    ],
    recentLessons: [
      {
        id: 1,
        date: '2024年1月25日',
        time: '10:00 - 11:00',
        lessonType: 'ヨガ入門',
        attended: true,
      },
      {
        id: 2,
        date: '2024年1月20日',
        time: '11:00 - 12:00',
        lessonType: 'ピラティス',
        attended: false,
      },
    ],
  });

  // ステータス変更の処理
  const handleStatusChange = async () => {
    try {
      const newStatus =
        customerDetails.status === 'active' ? 'inactive' : 'active';
      // TODO: APIを呼び出してステータスを更新
      console.log(
        `Updating status for customer ${customerDetails.id} to ${newStatus}`
      );
      setIsConfirmDialogOpen(false);
      // 成功時の処理（実際のAPIができたら実装）
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <OwnerNav />
      <main className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">会員詳細</h1>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => router.back()}>
              戻る
            </Button>
            <Dialog
              open={isConfirmDialogOpen}
              onOpenChange={setIsConfirmDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className={
                    customerDetails.status === 'active'
                      ? 'text-red-600'
                      : 'text-green-600'
                  }
                  onClick={() =>
                    setActionType(
                      customerDetails.status === 'active' ? 'suspend' : 'resume'
                    )
                  }
                >
                  {customerDetails.status === 'active'
                    ? '利用停止'
                    : '利用再開'}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {actionType === 'suspend'
                      ? '利用停止の確認'
                      : '利用再開の確認'}
                  </DialogTitle>
                  <DialogDescription>
                    {actionType === 'suspend'
                      ? 'この会員の利用を停止しますか？停止中は予約ができなくなります。'
                      : 'この会員の利用を再開しますか？再開後は通常通り予約ができるようになります。'}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-4 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsConfirmDialogOpen(false)}
                  >
                    キャンセル
                  </Button>
                  <Button
                    variant={
                      actionType === 'suspend' ? 'destructive' : 'default'
                    }
                    onClick={handleStatusChange}
                  >
                    {actionType === 'suspend' ? '停止する' : '再開する'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 基本情報 */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              基本情報
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">氏名</div>
                  <div className="text-gray-900">{customerDetails.name}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">メールアドレス</div>
                  <div className="text-gray-900">{customerDetails.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">電話番号</div>
                  <div className="text-gray-900">{customerDetails.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">入会日</div>
                  <div className="text-gray-900">
                    {customerDetails.joinDate}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">最終受講日</div>
                  <div className="text-gray-900">
                    {customerDetails.lastLesson}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">出席率</div>
                  <div className="text-gray-900">
                    {customerDetails.attendanceRate}%
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* 予約中のレッスン */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              予約中のレッスン
            </h2>
            <div className="space-y-4">
              {customerDetails.upcomingReservations.map(reservation => (
                <div key={reservation.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900">
                    {reservation.lessonType}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {reservation.date}
                  </div>
                  <div className="text-sm text-gray-500">
                    {reservation.time}
                  </div>
                </div>
              ))}
              {customerDetails.upcomingReservations.length === 0 && (
                <div className="text-gray-500 text-center py-4">
                  予約中のレッスンはありません
                </div>
              )}
            </div>
          </Card>

          {/* 受講履歴 */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              受講履歴
            </h2>
            <div className="space-y-4">
              {customerDetails.recentLessons.map(lesson => (
                <div key={lesson.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900">
                    {lesson.lessonType}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {lesson.date}
                  </div>
                  <div className="text-sm text-gray-500">{lesson.time}</div>
                  <div
                    className={`text-sm mt-2 ${
                      lesson.attended ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {lesson.attended ? '出席' : '欠席'}
                  </div>
                </div>
              ))}
              {customerDetails.recentLessons.length === 0 && (
                <div className="text-gray-500 text-center py-4">
                  受講履歴はありません
                </div>
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
