import { supabase } from '../client'
import type { Database } from '../types'

type Lesson = Database['public']['Tables']['fitness_reservation_lessons']['Row']
type LessonInsert = Database['public']['Tables']['fitness_reservation_lessons']['Insert']
type LessonUpdate = Database['public']['Tables']['fitness_reservation_lessons']['Update']

export async function getLessons() {
  const { data, error } = await supabase
    .from('fitness_reservation_lessons')
    .select(`
      *,
      trainer:fitness_reservation_users!user_id(
        id,
        name,
        email
      ),
      reservations:fitness_reservation_reservations(
        id,
        user_id,
        status,
        attended
      )
    `)
    .order('date', { ascending: true })
    .order('start_time', { ascending: true })

  return { data, error }
}

export async function getLessonById(id: string) {
  const { data, error } = await supabase
    .from('fitness_reservation_lessons')
    .select(`
      *,
      trainer:fitness_reservation_users!user_id(
        id,
        name,
        email
      ),
      reservations:fitness_reservation_reservations(
        id,
        user_id,
        status,
        attended,
        user:fitness_reservation_users(
          id,
          name,
          email,
          phone
        )
      )
    `)
    .eq('id', id)
    .single()

  return { data, error }
}

export async function createLesson(lessonData: LessonInsert) {
  const { data, error } = await supabase
    .from('fitness_reservation_lessons')
    .insert([lessonData])
    .select()
    .single()

  return { data, error }
}

export async function updateLesson(id: string, lessonData: LessonUpdate) {
  const { data, error } = await supabase
    .from('fitness_reservation_lessons')
    .update(lessonData)
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}

export async function deleteLesson(id: string) {
  const { error } = await supabase
    .from('fitness_reservation_lessons')
    .delete()
    .eq('id', id)

  return { error }
}

export async function getTrainerLessons(trainerId: string) {
  const { data, error } = await supabase
    .from('fitness_reservation_lessons')
    .select(`
      *,
      reservations:fitness_reservation_reservations(
        id,
        user_id,
        status,
        attended,
        user:fitness_reservation_users(
          id,
          name,
          email
        )
      )
    `)
    .eq('user_id', trainerId)
    .order('date', { ascending: true })
    .order('start_time', { ascending: true })

  return { data, error }
}

export async function updateLessonStatus(id: string, status: Lesson['status']) {
  const { data, error } = await supabase
    .from('fitness_reservation_lessons')
    .update({ status })
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}

export async function getTodayLessons() {
  const today = new Date().toISOString().split('T')[0]
  
  const { data, error } = await supabase
    .from('fitness_reservation_lessons')
    .select(`
      *,
      trainer:fitness_reservation_users!user_id(
        id,
        name
      ),
      reservations:fitness_reservation_reservations(
        id,
        status,
        user:fitness_reservation_users(
          id,
          name
        )
      )
    `)
    .eq('date', today)
    .order('start_time', { ascending: true })

  return { data, error }
} 