import { supabase } from '../client'
import type { Database } from '../types'

type Notification = Database['public']['Tables']['fitness_reservation_notifications']['Row']
type NotificationInsert = Database['public']['Tables']['fitness_reservation_notifications']['Insert']
type NotificationUpdate = Database['public']['Tables']['fitness_reservation_notifications']['Update']

export async function getNotifications(userId: string) {
  const { data, error } = await supabase
    .from('fitness_reservation_notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  return { data, error }
}

export async function getUnreadNotifications(userId: string) {
  const { data, error } = await supabase
    .from('fitness_reservation_notifications')
    .select('*')
    .eq('user_id', userId)
    .eq('read', false)
    .order('created_at', { ascending: false })

  return { data, error }
}

export async function createNotification(notificationData: NotificationInsert) {
  const { data, error } = await supabase
    .from('fitness_reservation_notifications')
    .insert([notificationData])
    .select()
    .single()

  return { data, error }
}

export async function markNotificationAsRead(id: string) {
  const { data, error } = await supabase
    .from('fitness_reservation_notifications')
    .update({ read: true })
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}

export async function markAllNotificationsAsRead(userId: string) {
  const { data, error } = await supabase
    .from('fitness_reservation_notifications')
    .update({ read: true })
    .eq('user_id', userId)
    .eq('read', false)
    .select()

  return { data, error }
}

export async function deleteNotification(id: string) {
  const { error } = await supabase
    .from('fitness_reservation_notifications')
    .delete()
    .eq('id', id)

  return { error }
}

// 特定のタイプの通知を作成するヘルパー関数
export async function createLessonNotification(
  userId: string,
  lessonId: string,
  type: 'reminder' | 'cancellation' | 'change'
) {
  const { data: lesson } = await supabase
    .from('fitness_reservation_lessons')
    .select(`
      type,
      date,
      start_time,
      trainer:fitness_reservation_users!trainer_id(name)
    `)
    .eq('id', lessonId)
    .single()

  if (!lesson) return { error: new Error('レッスンが見つかりません') }

  const messages = {
    reminder: `明日の${lesson.type}レッスン（${lesson.date} ${lesson.start_time}～）のリマインドです。`,
    cancellation: `${lesson.type}レッスン（${lesson.date} ${lesson.start_time}～）がキャンセルされました。`,
    change: `${lesson.type}レッスン（${lesson.date} ${lesson.start_time}～）の内容が変更されました。`
  }

  const { data, error } = await createNotification({
    user_id: userId,
    title: `${type === 'reminder' ? 'レッスンリマインド' : 'レッスン' + (type === 'cancellation' ? 'キャンセル' : '変更')}のお知らせ`,
    content: messages[type],
    type,
    read: false // readプロパティを追加
  })

  return { data, error }
} 