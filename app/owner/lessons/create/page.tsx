'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { OwnerNav } from '@/features/owner/components/owner-nav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createLesson } from '@/features/owner/data/lesson';
// import { LessonLocation, LessonStatus } from '@/features/owner/constants/lesson';
import type { Database } from '@/lib/supabase/supabaseTypes';
import { getTrainers } from '@/features/owner/data/trainer';

type LessonInsert = Database['public']['Tables']['fitness_reservation_lessons']['Insert'];

export default function CreateLessonPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<LessonInsert>({
    name: '',
    user_id: '',
    scheduled_start_at: '',
    scheduled_end_at: '',
    max_participants: 10,
    location: 'スタジオA' as Database['public']['Enums']['lesson_location'],
    status: '予定' as Database['public']['Enums']['lesson_status'],
    memo: '',
  });
  const [trainers, setTrainers] = useState<Database['public']['Tables']['fitness_reservation_users']['Row'][]>([]);
  useEffect(() => {
    const fetchTrainers = async () => {
      const { data: trainers, error } = await getTrainers();
      if (error) {
        console.error('トレーナーデータの取得に失敗しました:', error);
        return;
      }
      setTrainers(trainers);
    };
    fetchTrainers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await createLesson(formData);
      
      if (error) {
        throw error;
      }

      // 作成成功後、レッスン一覧ページに戻る
      router.push('/owner/lessons');
    } catch (error) {
      console.error('レッスンの作成に失敗しました:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <OwnerNav />
      <main className="container mx-auto p-8">
        <div className="max-w-2xl mx-auto">
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
              新規レッスン作成
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">レッスン名</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="trainer">担当トレーナー</Label>
                <Select
                  value={formData.user_id}
                  onValueChange={(value) =>
                    setFormData({ ...formData, user_id: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="トレーナーを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {trainers.map((trainer) => (
                      <SelectItem key={trainer.id} value={trainer.id}>
                        {trainer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start_time">開始日時</Label>
                  <Input
                    id="start_time"
                    type="datetime-local"
                    value={formData.scheduled_start_at}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        scheduled_start_at: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="end_time">終了日時</Label>
                  <Input
                    id="end_time"
                    type="datetime-local"
                    value={formData.scheduled_end_at}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        scheduled_end_at: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">開催場所</Label>
                <Select
                  value={formData.location}
                  onValueChange={(value: Database['public']['Enums']['lesson_location']) =>
                    setFormData({ ...formData, location: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="開催場所を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="スタジオA">スタジオA</SelectItem>
                    <SelectItem value="スタジオB">スタジオB</SelectItem>
                    <SelectItem value="オンライン">オンライン</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="max_participants">定員</Label>
                <Input
                  id="max_participants"
                  type="number"
                  min="1"
                  value={formData.max_participants}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      max_participants: parseInt(e.target.value),
                    })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="memo">メモ</Label>
                <Input
                  id="memo"
                  value={formData.memo || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, memo: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                キャンセル
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? '作成中...' : 'レッスンを作成'}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
} 