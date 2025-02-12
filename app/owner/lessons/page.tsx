'use client';

import { useState, useEffect } from 'react';
import { OwnerNav } from '../../../features/owner/components/owner-nav';
import { Button } from '@/components/ui/button';
import { Users, Search } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getLessons } from '@/features/owner/data/lesson';
import {
  LessonStatus,
  LessonStatusType,
} from '@/features/owner/constants/lesson';
import { Database } from '@/lib/supabase/supabaseTypes';
import { useRouter } from 'next/navigation';
export default function LessonsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    'all' | keyof typeof LessonStatus
  >('all');
  const [lessons, setLessons] = useState<
    Database['public']['Functions']['get_lessons_for_owner']['Returns']
  >([]);

  useEffect(() => {
    const fetchLessons = async () => {
      const { data: fetchedLessons, error } = await getLessons();
      if (error) {
        console.error('レッスンデータの取得に失敗しました:', error);
      } else if (fetchedLessons) {
        setLessons(fetchedLessons);
      }
    };

    fetchLessons();
  }, []);

  // ステータスに応じたバッジのスタイルを返す
  const getStatusBadgeStyle = (status: LessonStatusType) => {
    switch (status) {
      case LessonStatus.SCHEDULED:
        return 'bg-sky-100 text-sky-800';
      case LessonStatus.IN_PROGRESS:
        return 'bg-green-100 text-green-800';
      case LessonStatus.COMPLETED:
        return 'bg-gray-100 text-gray-800';
      case LessonStatus.CANCELLED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLessons = lessons.filter(lesson => {
    const lessonData =
      (statusFilter === 'all' ||
        lesson.status === LessonStatus[statusFilter]) &&
      (lesson.name.includes(searchQuery) ||
        lesson.user_name.includes(searchQuery) ||
        lesson.location.includes(searchQuery));
    return lessonData;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <OwnerNav />
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
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-200 rounded-md bg-white"
              value={statusFilter}
              onChange={e =>
                setStatusFilter(e.target.value as typeof statusFilter)
              }
            >
              <option value="all">すべてのステータス</option>
              {Object.entries(LessonStatus).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
            <Button
              className="bg-sky-500 hover:bg-sky-600"
              onClick={() => {
                router.push('/owner/lessons/create');
              }}
            >
              新規レッスン作成
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>日時</TableHead>
                <TableHead>レッスン</TableHead>
                <TableHead>トレーナー</TableHead>
                <TableHead>場所</TableHead>
                <TableHead>参加者</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLessons.map(lesson => (
                <TableRow key={lesson.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>
                        {new Date(lesson.scheduled_start_at).toLocaleDateString(
                          'ja-JP'
                        )}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(lesson.scheduled_start_at).toLocaleTimeString(
                          'ja-JP',
                          { hour: '2-digit', minute: '2-digit' }
                        )}{' '}
                        -
                        {new Date(lesson.scheduled_end_at).toLocaleTimeString(
                          'ja-JP',
                          { hour: '2-digit', minute: '2-digit' }
                        )}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{lesson.name}</TableCell>
                  <TableCell>{lesson.user_name}</TableCell>
                  <TableCell>{lesson.location}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>
                        {lesson.participants_count}/{lesson.max_participants}
                      </span>
                      {/* {lesson.reservations.some(r => !r.user.phone) && (
                        <span className="px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">
                          初回あり
                        </span>
                      )} */}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeStyle(
                        lesson.status
                      )}`}
                    >
                      {lesson.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="mr-2">
                      詳細
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      キャンセル
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
