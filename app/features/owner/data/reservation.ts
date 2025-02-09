import { supabase } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/types';
import type { Reservation } from '../types/reservation';
import { ReservationStatus, ReservationStatusType } from '../constants/reservation';
import { Lesson } from '../types/lesson';
import { User } from '@supabase/supabase-js';
import { LessonLocationType, LessonStatusType } from '../constants/lesson';
import { Member } from '../types/member';
import { MemberStatusType } from '../constants/member';

type DbReservation = Database['public']['Tables']['fitness_reservation_reservations']['Row'];
type DbLesson = Database['public']['Tables']['fitness_reservation_lessons']['Row'];
type DbUser = Database['public']['Tables']['fitness_reservation_users']['Row'];

// DBのデータを型に変換する関数
function convertToReservation(
  dbReservation: DbReservation & { lesson: DbLesson, user: DbUser },
//   dbLesson: DbLesson,
//   dbUser: DbUser
): Reservation & {
//   lesson: Lesson;
//   member: Member;
} {
  return {
    id: dbReservation.id,
    lessonId: dbReservation.lesson_id,
    userId: dbReservation.user_id,
    status: dbReservation.status as ReservationStatusType,
    attended: dbReservation.attended,
    reservedAt: dbReservation.reserved_at,
    cancelledAt: dbReservation.cancelled_at,
    createdAt: dbReservation.created_at,
    updatedAt: dbReservation.updated_at,
    lesson: {
      id: dbReservation.lesson.id,
      lessonTypeId: dbReservation.lesson.lesson_type_id,
      location: dbReservation.lesson.location as LessonLocationType,
      maxParticipants: dbReservation.lesson.max_participants,
      memo: dbReservation.lesson.memo,
      scheduledStartAt: dbReservation.lesson.scheduled_start_at,
      scheduledEndAt: dbReservation.lesson.scheduled_end_at,
      trainerId: dbReservation.lesson.trainer_id,
      status: dbReservation.lesson.status as LessonStatusType,
      createdAt: dbReservation.lesson.created_at,
      updatedAt: dbReservation.lesson.updated_at,
    },
    member: {
      id: dbUser.id,
      roleId: dbUser.role_id,
      name: dbUser.name,
      password: null,
      email: dbUser.email,
      phone: dbUser.phone,
      address: dbUser.address,
      status: dbUser.status as MemberStatusType,
      cancellationReason: dbUser.cancellation_reason,
      joinDate: dbUser.join_date,
      totalLessons: null,
      lastLesson: null,
    },
  }
}

// 予約一覧を取得
export async function getReservations() {
  const { data, error } = await supabase
    .from('fitness_reservation_reservations')
    .select(`
      *,
      lesson:fitness_reservation_lessons(
        id,
        lesson_type,
        scheduled_start_at,
        scheduled_end_at,
        trainer:fitness_reservation_users!trainer_id(
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
    `)
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
    .select(`
      *,
      lesson:fitness_reservation_lessons(
        id,
        lesson_type,
        scheduled_start_at,
        scheduled_end_at,
        trainer:fitness_reservation_users!trainer_id(
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
    `)
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
    .select(`
      *,
      lesson:fitness_reservation_lessons(
        id,
        lesson_type,
        scheduled_start_at,
        scheduled_end_at,
        trainer:fitness_reservation_users!trainer_id(
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
    `)
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
    .select(`
      *,
      lesson:fitness_reservation_lessons(
        id,
        lesson_type,
        scheduled_start_at,
        scheduled_end_at,
        trainer:fitness_reservation_users!trainer_id(
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
    `)
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
    .select(`
      *,
      lesson:fitness_reservation_lessons(
        id,
        lesson_type,
        scheduled_start_at,
        scheduled_end_at,
        trainer:fitness_reservation_users!trainer_id(
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
    `)
    .eq('status', status)
    .order('reserved_at', { ascending: false });

  if (error) {
    console.error('予約データの取得に失敗しました:', error);
    return { data: null, error };
  }

  const reservations = data.map(convertToReservation);
  return { data: reservations, error: null };
} 