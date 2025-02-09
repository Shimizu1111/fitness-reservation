import { supabase } from '../client'
import type { Database } from '../types'

type UserStats = Database['public']['Tables']['fitness_reservation_user_stats']['Row']
type UserStatsUpdate = Database['public']['Tables']['fitness_reservation_user_stats']['Update']

export async function getUserStats(userId: string) {
  const { data, error } = await supabase
    .from('fitness_reservation_user_stats')
    .select('*')
    .eq('user_id', userId)
    .single()

  return { data, error }
}

export async function updateUserStats(userId: string, statsData: UserStatsUpdate) {
  const { data, error } = await supabase
    .from('fitness_reservation_user_stats')
    .update(statsData)
    .eq('user_id', userId)
    .select()
    .single()

  return { data, error }
}

export async function getTopAttendees(limit: number = 10) {
  const { data, error } = await supabase
    .from('fitness_reservation_user_stats')
    .select(`
      *,
      user:fitness_reservation_users(
        id,
        name
      )
    `)
    .order('attended_lessons', { ascending: false })
    .limit(limit)

  return { data, error }
}

export async function getLessonAttendanceStats(startDate: string, endDate: string) {
  const { data, error } = await supabase
    .from('fitness_reservation_lessons')
    .select(`
      id,
      date,
      type,
      reservations:fitness_reservation_reservations(
        attended
      )
    `)
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: true })

  return { data, error }
}

export async function getUserAttendanceRate(userId: string) {
  const { data: stats, error } = await supabase
    .from('fitness_reservation_user_stats')
    .select('total_lessons, attended_lessons')
    .eq('user_id', userId)
    .single()

  if (error) return { data: null, error }
  if (!stats) return { data: 0, error: null }

  const rate = stats.total_lessons > 0
    ? (stats.attended_lessons / stats.total_lessons) * 100
    : 0

  return { data: Math.round(rate * 10) / 10, error: null }
} 