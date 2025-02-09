import { supabase } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/types';
import type { Member } from './types';
import { getMemberStatusString, MemberStatusType } from '../constants/member';

type User = Database['public']['Tables']['fitness_reservation_users']['Row'];

export type UserReservationSummary = Database['public']['Functions']['get_user_reservation_summary']['Returns'][number];

// 会員一覧を取得
export async function getMembers() {
  const { data: users, error: userError } = await supabase.rpc('get_user_reservation_summary');

  if (userError) {
    console.error('会員データの取得に失敗しました:', userError);
    return { data: null, error: userError };
  }

  const members: Member[] = users?.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone || null,
    address: null,
    joinDate: user.join_date,
    totalLessons: user.reservation_count,
    lastLesson: user.latest_reserved_at || null,
    status: user.status as MemberStatusType,
    cancellationReason: null,
    createdAt: null,
    updatedAt: null,
  })) || [];
  
  return { data: members, error: null };
}

// 会員詳細を取得
export async function getMemberById(id: string) {
  const { data, error } = await supabase
    .from('fitness_reservation_users')
    .select(`
      *,
      fitness_reservation_reservations(
        id,
        status,
        attended,
        reserved_at,
        lesson_id
      )
    `)
    .eq('id', id)
    .single();

  if (error) return { data: null, error };
  if (!data) return { data: null, error: new Error('会員が見つかりません') };

  return { data: convertToMember(data), error: null };
}

// 会員のステータスを更新
export async function updateMemberStatus(id: string, status: 'active' | 'inactive') {
  const statusValue = status === 'active' ? 1 : 2;
  
  const { data, error } = await supabase
    .from('fitness_reservation_users')
    .update({ status: statusValue })
    .eq('id', id)
    .select()
    .single();

  if (error) return { data: null, error };
  if (!data) return { data: null, error: new Error('会員が見つかりません') };

  return { data: convertToMember(data), error: null };
}

// 新規会員を登録
export async function createMember(memberData: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) {
  try {
    // 1. Authユーザーを作成
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: memberData.email,
      password: memberData.password,
    });

    if (authError) throw authError;

    // 2. プロフィール情報を作成
    const { data: userData, error: userError } = await supabase
      .from('fitness_reservation_users')
      .insert([
        {
          name: memberData.name,
          email: memberData.email,
          phone: memberData.phone,
          password: memberData.password, // ハッシュ化されたパスワードを保存
          role_id: 3, // customer role
          status: 1, // active
          join_date: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (userError) throw userError;
    return { data: convertToMember(userData), error: null };
    
  } catch (error) {
    console.error('会員登録エラー:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error : new Error('会員登録に失敗しました') 
    };
  }
} 