import { supabase } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/supabaseTypes';
export type UserReservationSummary =
  Database['public']['Functions']['get_customers_for_owner']['Returns'][number];

// 会員一覧を取得
export async function getCustomers() {
  const { data: fetchedCustomers, error: userError } = await supabase.rpc(
    'get_customers_for_owner'
  );

  if (userError) {
    console.error('会員データの取得に失敗しました:', userError);
    return { data: null, error: userError };
  }

  return { data: fetchedCustomers, error: null };
}

// 会員詳細を取得
export async function getCustomerById(id: string) {
  const { data: fetchedCustomer, error: userError } = await supabase
    .from('fitness_reservation_users')
    .select(
      `
      *,
      fitness_reservation_reservations(
        id,
        status,
        attended,
        reserved_at,
        lesson_id
      )
    `
    )
    .eq('id', id)
    .single();

  if (userError) return { data: null, userError };
  if (!fetchedCustomer)
    return { data: null, error: new Error('会員が見つかりません') };

  return { data: fetchedCustomer, error: null };
}

// 会員のステータスを更新
export async function updateCustomerStatus(
  id: string,
  status: Database['public']['Enums']['customer_status']
) {
  const { data, error } = await supabase
    .from('fitness_reservation_users')
    .update({ customer_status: status })
    .eq('id', id)
    .select()
    .single();

  if (error) return { data: null, error };
  if (!data) return { data: null, error: new Error('会員が見つかりません') };

  return { data: null, error: null };
}

// 新規会員を登録
export async function createCustomer(customerData: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) {
  try {
    // 1. Authユーザーを作成
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: customerData.email,
      password: customerData.password,
    });

    if (authError) throw authError;

    // 2. プロフィール情報を作成
    const { data: userData, error: userError } = await supabase
      .from('fitness_reservation_users')
      .insert([
        {
          name: customerData.name,
          email: customerData.email,
          phone: customerData.phone,
          password: customerData.password, // ハッシュ化されたパスワードを保存
          role_id: 3, // customer role
          status: 1, // active
          join_date: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (userError) throw userError;
    return { data: userData, error: null };
  } catch (error) {
    console.error('会員登録エラー:', error);
    return {
      data: null,
      error:
        error instanceof Error ? error : new Error('会員登録に失敗しました'),
    };
  }
}
