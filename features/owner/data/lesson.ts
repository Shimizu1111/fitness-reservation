import { supabase } from '@/lib/supabase/client';
import { LessonStatusType } from '../constants/lesson';

export async function getLessons() {
  const { data: fetchedLessons, error: lessonError } = await supabase.rpc(
    'get_lessons_for_owner'
  );

  if (lessonError) {
    console.error('レッスンデータの取得に失敗しました:', lessonError);
    return { data: null, lessonError };
  }

  return { data: fetchedLessons, error: lessonError };
}

export async function updateLessonStatus(id: number, status: LessonStatusType) {
  const { data, error } = await supabase
    .from('fitness_reservation_lessons')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('レッスンステータスの更新に失敗しました:', error);
    return { data: null, error };
  }

  return { data, error: null };
}
