// import { supabase } from '../client'
// import type { Database } from '@/lib/types/database'
// import type { Member } from '@/lib/types/models'

// type User = Database['public']['Tables']['fitness_reservation_users']['Row']
// type UserInsert = Database['public']['Tables']['fitness_reservation_users']['Insert']
// type UserUpdate = Database['public']['Tables']['fitness_reservation_users']['Update']

// type Reservation = {
//   id: string;
//   lesson_id: string;
//   user_id: string;
//   status: "confirmed" | "waitlisted" | "cancelled"; // ReservationStatus型に基づく
//   attended: boolean | null;
//   cancelled_at: string | null;
//   date: string;
//   created_at: string;
//   updated_at: string;
// };

// // export async function getUsers() {
// //   const { data, error } = await supabase
// //     .from('fitness_reservation_users')
// //     .select('*')
// //     .order('created_at', { ascending: false })

// //   return { data, error }
// // }

// // データベースの型からアプリケーションの型への変換関数
// function convertToMember(
//   user: User & { 
//     fitness_reservation_reservations?: any[],
//     total_reservations?: number,
//     last_attended_date?: string | null 
//   }
// ): Member {
//   return {
//     id: user.id,
//     name: user.name,
//     email: user.email,
//     phone: user.phone,
//     joinDate: user.join_date,
//     totalLessons: user.total_reservations || 0,
//     lastLesson: user.last_attended_date || null,
//     status: user.status
//   }
// }

// export async function getUsers() {
//   // 現在のユーザー情報を取得
//   const { data: { user }, error: authError } = await supabase.auth.getUser();
//   console.log('Current user:', user);
//   console.log('Auth error:', authError);

//   // const { data: users, error: userError } = await supabase.rpc('get_user_reservation_summary')
//   const { data: users, error: userError } = await supabase.rpc('get_user_reservation_summary')

//   if (userError) {
//     return { data: null, error: userError };
//   }

//   const usersWithDetails = users?.map((user) => {
//     // const stats = user.fitness_reservation_user_stats?.[0] || {
//     //   total_lessons: 0,
//     //   attended_lessons: 0,
//     //   last_lesson_date: null
//     // };

//     return convertToMember({
//       ...user,
//       // total_reservations: stats.total_lessons,
//       // last_attended_date: stats.last_lesson_date
//       total_reservations: user.reservation_count,
//       last_attended_date: user.latest_reserved_at
//     });
//   }) || [];

//   return { data: usersWithDetails, error: null };
// }

// export async function getUserById(id: string) {
//   const { data, error } = await supabase
//     .from('fitness_reservation_users')
//     .select('*')
//     .eq('id', id)
//     .single()

//   if (error) return { data: null, error }
//   if (!data) return { data: null, error: new Error('User not found') }

//   return { data: convertToMember(data), error: null }
// }

// export async function createUser(userData: UserInsert) {
//   const { data, error } = await supabase
//     .from('fitness_reservation_users')
//     .insert([userData])
//     .select()
//     .single()

//   if (error) return { data: null, error }
//   if (!data) return { data: null, error: new Error('Failed to create user') }

//   return { data: convertToMember(data), error: null }
// }

// export async function updateUser(id: string, userData: UserUpdate) {
//   const { data, error } = await supabase
//     .from('fitness_reservation_users')
//     .update(userData)
//     .eq('id', id)
//     .select()
//     .single()

//   if (error) return { data: null, error }
//   if (!data) return { data: null, error: new Error('User not found') }

//   return { data: convertToMember(data), error: null }
// }

// export async function deleteUser(id: string) {
//   const { error } = await supabase
//     .from('fitness_reservation_users')
//     .delete()
//     .eq('id', id)

//   return { error }
// }

// export async function getUsersByRole(role: User['role']) {
//   const { data, error } = await supabase
//     .from('fitness_reservation_users')
//     .select('*')
//     .eq('role', role)
//     .order('created_at', { ascending: false })

//   if (error) return { data: null, error }
//   if (!data) return { data: [], error: null }

//   return { data: data.map(convertToMember), error: null }
// }

// export async function updateUserStatus(id: string, status: User['status']) {
//   const { data, error } = await supabase
//     .from('fitness_reservation_users')
//     .update({ status })
//     .eq('id', id)
//     .select()
//     .single()

//   if (error) return { data: null, error }
//   if (!data) return { data: null, error: new Error('User not found') }

//   return { data: convertToMember(data), error: null }
// } 