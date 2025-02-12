'use client';

import { TrainerNav } from '../../components/trainer-nav';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, ArrowLeft } from 'lucide-react';
import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface LessonDetails {
  id: number;
  date: string;
  time: string;
  type: string;
  participants: Array<{
    id: number;
    name: string;
    email: string;
    phone: string;
    isFirstTime: boolean;
    attended?: boolean;
  }>;
  maxParticipants: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
}

export default function LessonDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [isAttendanceDialogOpen, setIsAttendanceDialogOpen] = useState(false);

  // 仮のレッスン詳細データ
  const [lessonDetails] = useState<LessonDetails>({
    id: parseInt(id),
    date: '2024年2月1日',
    time: '10:00 - 11:00',
    type: 'ヨガ入門',
    participants: [
      {
        id: 1,
        name: '田中太郎',
        email: 'tanaka@example.com',
        phone: '090-1234-5678',
        isFirstTime: false,
        attended: true,
      },
      {
        id: 2,
        name: '鈴木花子',
        email: 'suzuki@example.com',
        phone: '090-8765-4321',
        isFirstTime: true,
        attended: false,
      },
      {
        id: 3,
        name: '山本次郎',
        email: 'yamamoto@example.com',
        phone: '090-9999-8888',
        isFirstTime: false,
        attended: true,
      },
      {
        id: 4,
        name: '佐藤美咲',
        email: 'sato@example.com',
        phone: '090-1111-2222',
        isFirstTime: true,
        attended: false,
      },
      {
        id: 5,
        name: '伊藤健一',
        email: 'ito@example.com',
        phone: '090-3333-4444',
        isFirstTime: false,
        attended: true,
      },
      {
        id: 6,
        name: '高橋和子',
        email: 'takahashi@example.com',
        phone: '090-5555-6666',
        isFirstTime: true,
        attended: false,
      },
      {
        id: 7,
        name: '渡辺隆',
        email: 'watanabe@example.com',
        phone: '090-7777-8888',
        isFirstTime: false,
        attended: true,
      },
      {
        id: 8,
        name: '中村優子',
        email: 'nakamura@example.com',
        phone: '090-9999-0000',
        isFirstTime: true,
        attended: false,
      },
      {
        id: 9,
        name: '小林直樹',
        email: 'kobayashi@example.com',
        phone: '090-2222-3333',
        isFirstTime: false,
        attended: true,
      },
      {
        id: 10,
        name: '山田花子',
        email: 'yamada@example.com',
        phone: '090-4444-5555',
        isFirstTime: true,
        attended: false,
      },
    ],
    maxParticipants: 15,
    status: 'upcoming',
    notes: '初回の方が多いため、基本的な動作の説明を丁寧に行う',
  });

  // ステータスに応じたバッジのスタイルを返す
  const getStatusBadgeStyle = (status: LessonDetails['status']) => {
    switch (status) {
      case 'upcoming':
        return 'bg-sky-100 text-sky-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
    }
  };

  // ステータスの日本語表示
  const getStatusText = (status: LessonDetails['status']) => {
    switch (status) {
      case 'upcoming':
        return '予定';
      case 'completed':
        return '完了';
      case 'cancelled':
        return 'キャンセル';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TrainerNav />
      <main className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-gray-600"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              戻る
            </Button>
            <h1 className="text-3xl font-bold text-gray-800">レッスン詳細</h1>
          </div>
          {lessonDetails.status === 'upcoming' && (
            <Dialog
              open={isAttendanceDialogOpen}
              onOpenChange={setIsAttendanceDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>出欠を記録</Button>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>出欠の記録</DialogTitle>
                  <DialogDescription>
                    参加者の出欠を記録します。
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>名前</TableHead>
                        <TableHead>出欠</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lessonDetails.participants.map(participant => (
                        <TableRow key={participant.id}>
                          <TableCell>{participant.name}</TableCell>
                          <TableCell>
                            <select
                              className="border border-gray-200 rounded-md p-1"
                              defaultValue={
                                participant.attended ? 'attended' : 'absent'
                              }
                            >
                              <option value="attended">出席</option>
                              <option value="absent">欠席</option>
                            </select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="flex justify-end gap-4 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsAttendanceDialogOpen(false)}
                    >
                      キャンセル
                    </Button>
                    <Button onClick={() => setIsAttendanceDialogOpen(false)}>
                      保存
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* レッスン情報 */}
          <Card className="p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              レッスン情報
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium text-gray-900">
                  {lessonDetails.type}
                </h3>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeStyle(lessonDetails.status)}`}
                >
                  {getStatusText(lessonDetails.status)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{lessonDetails.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{lessonDetails.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>
                    {lessonDetails.participants.length}/
                    {lessonDetails.maxParticipants}名
                  </span>
                </div>
              </div>
              {lessonDetails.notes && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    メモ
                  </h4>
                  <p className="text-gray-600">{lessonDetails.notes}</p>
                </div>
              )}
            </div>
          </Card>

          {/* 参加者一覧 */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              参加者一覧 ({lessonDetails.participants.length}名)
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              参加者が多い場合はスクロールしてください。
            </p>
            <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md">
              <div className="space-y-4">
                {lessonDetails.participants.map(participant => (
                  <div
                    key={participant.id}
                    className="p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">
                          {participant.name}
                        </span>
                        {participant.isFirstTime && (
                          <span className="px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">
                            初回
                          </span>
                        )}
                      </div>
                      {lessonDetails.status === 'completed' && (
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            participant.attended
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {participant.attended ? '出席' : '欠席'}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {participant.email}
                    </div>
                    <div className="text-sm text-gray-500">
                      {participant.phone}
                    </div>
                  </div>
                ))}
                {lessonDetails.participants.length === 0 && (
                  <div className="text-gray-500 text-center py-4">
                    参加者はいません
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
