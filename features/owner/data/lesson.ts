import { supabase } from '@/lib/supabase/client';
import { LessonStatusType } from '../constants/lesson';
import { Database } from '@/lib/supabase/supabaseTypes';

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

export const getLessonById = async (id: string) => {
  const { data: lesson, error: lessonError } = await supabase
    .from('fitness_reservation_lessons')
    .select(`
      *,
      user:fitness_reservation_users!user_id (
        id,
        name,
        email
      ),
      reservations:fitness_reservation_reservations (
        id,
        status,
        user:fitness_reservation_users (
          id,
          name,
          email,
          phone
        )
      )
    `)
    .eq('id', parseInt(id))
    .single();

  if (lessonError) {
    return { error: lessonError };
  }

  return { data: lesson };
};

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

export async function createLesson(lesson: Database['public']['Tables']['fitness_reservation_lessons']['Insert']) {
  const { data, error } = await supabase
    .from('fitness_reservation_lessons')
    .insert(lesson)
    .select()
    .single();

  return { data, error };
}
