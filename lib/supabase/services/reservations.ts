import { supabase } from '../client'
import type { Database } from '../types'

type Reservation = Database['public']['Tables']['fitness_reservation_reservations']['Row']
type ReservationInsert = Database['public']['Tables']['fitness_reservation_reservations']['Insert']
type ReservationUpdate = Database['public']['Tables']['fitness_reservation_reservations']['Update']

export async function getReservations() {
  const { data, error } = await supabase
    .from('fitness_reservation_reservations')
    .select(`
      *,
      lesson:fitness_reservation_lessons(
        id,
        type,
        date,
        start_time,
        end_time,
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
    .order('created_at', { ascending: false })

  return { data, error }
}

export async function getReservationById(id: string) {
  const { data, error } = await supabase
    .from('fitness_reservation_reservations')
    .select(`
      *,
      lesson:fitness_reservation_lessons(
        id,
        type,
        date,
        start_time,
        end_time,
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
    .eq('id', id)
    .single()

  return { data, error }
}

export async function createReservation(reservationData: ReservationInsert) {
  const { data, error } = await supabase
    .from('fitness_reservation_reservations')
    .insert([reservationData])
    .select()
    .single()

  return { data, error }
}

export async function updateReservation(id: string, reservationData: ReservationUpdate) {
  const { data, error } = await supabase
    .from('fitness_reservation_reservations')
    .update(reservationData)
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}

export async function deleteReservation(id: string) {
  const { error } = await supabase
    .from('fitness_reservation_reservations')
    .delete()
    .eq('id', id)

  return { error }
}

export async function getUserReservations(userId: string) {
  const { data, error } = await supabase
    .from('fitness_reservation_reservations')
    .select(`
      *,
      lesson:fitness_reservation_lessons(
        id,
        type,
        date,
        start_time,
        end_time,
        trainer:fitness_reservation_users!trainer_id(
          id,
          name
        )
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  return { data, error }
}

export async function getLessonReservations(lessonId: string) {
  const { data, error } = await supabase
    .from('fitness_reservation_reservations')
    .select(`
      *,
      user:fitness_reservation_users(
        id,
        name,
        email,
        phone
      )
    `)
    .eq('lesson_id', lessonId)
    .order('created_at', { ascending: true })

  return { data, error }
}

export async function updateReservationAttendance(id: string, attended: boolean) {
  const { data, error } = await supabase
    .from('fitness_reservation_reservations')
    .update({ attended })
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}

export async function cancelReservation(id: string) {
  const { data, error } = await supabase
    .from('fitness_reservation_reservations')
    .update({
      status: 'cancelled',
      cancelled_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()

  return { data, error }
} 