import { createClient } from '@supabase/supabase-js'
import { Database } from '../lib/supabase/types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabaseの環境変数が設定されていません。')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey) 