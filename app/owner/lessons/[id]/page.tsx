'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { OwnerNav } from '@/features/owner/components/owner-nav';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Calendar, Clock, MapPin, Users } from 'lucide-react';
import { getLessonById } from '@/features/owner/data/lesson';
import { use } from 'react';

type LessonWithDetails = Awaited<
  ReturnType<typeof getLessonById>
>['data'];

export default function LessonDetailsPage({
  params,
}: {
    params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [lesson, setLesson] = useState<LessonWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = use(params);

  useEffect(() => {
    const fetchLesson = async () => {
      const { data, error } = await getLessonById(id);
      if (error) {
        console.error('レッスンデータの取得に失敗しました:', error);
        return;
      }
      setLesson(data);
      setIsLoading(false);
    };

    fetchLesson();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <OwnerNav />
        <main className="container mx-auto p-8">
          <div className="text-center">読み込み中...</div>
        </main>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50">
        <OwnerNav />
        <main className="container mx-auto p-8">
          <div className="text-center">レッスンが見つかりませんでした。</div>
        </main>
      </div>
    );
  }

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case '予定':
        return 'bg-sky-100 text-sky-800';
      case '進行中':
        return 'bg-green-100 text-green-800';
      case '完了':
        return 'bg-gray-100 text-gray-800';
      case 'キャンセル':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <OwnerNav />
      <main className="container mx-auto p-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              className="text-gray-600"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              戻る
            </Button>
            <h1 className="text-3xl font-bold text-gray-800">
              レッスン詳細
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* レッスン情報 */}
            <Card className="p-6 lg:col-span-2">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {lesson.name}
                  </h2>
                  <span
                    className={`inline-block mt-2 px-3 py-1 text-sm font-medium rounded-full ${getStatusBadgeStyle(
                      lesson.status
                    )}`}
                  >
                    {lesson.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-5 w-5" />
                    <span>
                      {new Date(lesson.scheduled_start_at).toLocaleDateString(
                        'ja-JP'
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-5 w-5" />
                    <span>
                      {new Date(lesson.scheduled_start_at).toLocaleTimeString(
                        'ja-JP',
                        { hour: '2-digit', minute: '2-digit' }
                      )}{' '}
                      -{' '}
                      {new Date(lesson.scheduled_end_at).toLocaleTimeString(
                        'ja-JP',
                        { hour: '2-digit', minute: '2-digit' }
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-5 w-5" />
                    <span>{lesson.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="h-5 w-5" />
                    <span>
                      {lesson.reservations?.length || 0}/{lesson.max_participants}名
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    担当トレーナー
                  </h3>
                  <div className="text-gray-600">
                    <p>{lesson.user.name}</p>
                    <p className="text-sm">{lesson.user.email}</p>
                  </div>
                </div>
              </div>

              {lesson.memo && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    メモ
                  </h3>
                  <p className="text-gray-600">{lesson.memo}</p>
                </div>
              )}
            </Card>

            {/* 予約者一覧 */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                予約者一覧
              </h2>
              <div className="space-y-4">
                {lesson.reservations && lesson.reservations.length > 0 ? (
                  lesson.reservations.map((reservation) => (
                    <div
                      key={reservation.id}
                      className="p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="font-medium text-gray-900">
                        {reservation.user.name}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {reservation.user.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {reservation.user.phone}
                      </div>
                      <div
                        className={`mt-2 text-sm ${
                          reservation.status === '予約確定'
                            ? 'text-green-600'
                            : 'text-gray-600'
                        }`}
                      >
                        {reservation.status}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-4">
                    予約者はいません
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
} 