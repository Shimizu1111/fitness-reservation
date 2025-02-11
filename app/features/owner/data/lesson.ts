export async function getLessons() {
    const { data, error } = await supabase
      .from('fitness_reservation_lessons')
      .select(`
        id,
        name,
        scheduled_start_at,
        scheduled_end_at,
        max_participants,
        location,
        status,
        memo,
        trainer:fitness_reservation_users!user_id(
          id,
          name
        ),
        reservations:fitness_reservation_reservations(
          id,
          status,
          user:fitness_reservation_users(
            id,
            name,
            email,
            phone
          )
        )
      `)
      .order('scheduled_start_at', { ascending: true });
  
    if (error) {
      console.error('レッスンデータの取得に失敗しました:', error);
      return { data: null, error };
    }
  
    return { data, error: null };
  }
  
  export async function updateLessonStatus(id: number, status: number) {
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