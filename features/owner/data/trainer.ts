import { supabase } from '@/lib/supabase/client';

// トレーナー一覧を取得
export async function getTrainers() {
  const { data: fetchedTrainers, error: trainerError } = await supabase
    .from('fitness_reservation_users')
    .select('*')
    .eq('role', 'トレーナー');

  if (trainerError) {
    console.error('トレーナーデータの取得に失敗しました:', trainerError);
    return { data: null, error: trainerError };
  }

  return { data: fetchedTrainers, error: null };
}
