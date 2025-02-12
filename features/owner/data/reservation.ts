import { supabase } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/supabaseTypes';

type DbReservation =
  Database['public']['Tables']['fitness_reservation_reservations']['Row'];
type DbLesson =
  Database['public']['Tables']['fitness_reservation_lessons']['Row'];
type DbUser = Database['public']['Tables']['fitness_reservation_users']['Row'];

// 予約一覧を取得
export async function getReservations() {
  const { data, error } = await supabase
    .from('fitness_reservation_reservations')
    .select(
      `
      *,
      lesson:fitness_reservation_lessons(
        id,
        lesson_type,
        scheduled_start_at,
        scheduled_end_at,
        trainer:fitness_reservation_users!user_id(
          id,
          name
        )
      ),
      user:fitness_reservation_users(
        id,
        name,
        email,
        phone
      )
    `
    )
    .order('reserved_at', { ascending: false });

  if (error) {
    console.error('予約データの取得に失敗しました:', error);
    return { data: null, error };
  }

  //   const reservations = data.map(convertToReservation);
  const reservations = convertToReservation(data);
  return { data: reservations, error: null };
}

// 予約をキャンセル
export async function cancelReservation(id: number) {
  const { data, error } = await supabase
    .from('fitness_reservation_reservations')
    .update({
      status: ReservationStatus.CANCELLED,
      cancelled_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select(
      `
      *,
      lesson:fitness_reservation_lessons(
        id,
        lesson_type,
        scheduled_start_at,
        scheduled_end_at,
        trainer:fitness_reservation_users!user_id(
          id,
          name
        )
      ),
      user:fitness_reservation_users(
        id,
        name,
        email,
        phone
      )
    `
    )
    .single();

  if (error) {
    console.error('予約のキャンセルに失敗しました:', error);
    return { data: null, error };
  }

  return { data: convertToReservation(data), error: null };
}

// 予約のステータスを更新
export async function updateReservationStatus(id: number, status: number) {
  const { data, error } = await supabase
    .from('fitness_reservation_reservations')
    .update({ status })
    .eq('id', id)
    .select(
      `
      *,
      lesson:fitness_reservation_lessons(
        id,
        lesson_type,
        scheduled_start_at,
        scheduled_end_at,
        trainer:fitness_reservation_users!user_id(
          id,
          name
        )
      ),
      user:fitness_reservation_users(
        id,
        name,
        email,
        phone
      )
    `
    )
    .single();

  if (error) {
    console.error('予約ステータスの更新に失敗しました:', error);
    return { data: null, error };
  }

  return { data: convertToReservation(data), error: null };
}

// 特定の日付の予約を取得
export async function getReservationsByDate(date: string) {
  const { data, error } = await supabase
    .from('fitness_reservation_reservations')
    .select(
      `
      *,
      lesson:fitness_reservation_lessons(
        id,
        lesson_type,
        scheduled_start_at,
        scheduled_end_at,
        trainer:fitness_reservation_users!user_id(
          id,
          name
        )
      ),
      user:fitness_reservation_users(
        id,
        name,
        email,
        phone
      )
    `
    )
    .eq('lesson.scheduled_start_at::date', date)
    .order('lesson.scheduled_start_at', { ascending: true });

  if (error) {
    console.error('予約データの取得に失敗しました:', error);
    return { data: null, error };
  }

  const reservations = data.map(convertToReservation);
  return { data: reservations, error: null };
}

// 特定のステータスの予約を取得
export async function getReservationsByStatus(status: number) {
  const { data, error } = await supabase
    .from('fitness_reservation_reservations')
    .select(
      `
      *,
      lesson:fitness_reservation_lessons(
        id,
        lesson_type,
        scheduled_start_at,
        scheduled_end_at,
        trainer:fitness_reservation_users!user_id(
          id,
          name
        )
      ),
      user:fitness_reservation_users(
        id,
        name,
        email,
        phone
      )
    `
    )
    .eq('status', status)
    .order('reserved_at', { ascending: false });

  if (error) {
    console.error('予約データの取得に失敗しました:', error);
    return { data: null, error };
  }

  const reservations = data.map(convertToReservation);
  return { data: reservations, error: null };
}
