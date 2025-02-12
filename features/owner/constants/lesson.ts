import { Database } from '@/lib/supabase/types';

export const LessonStatus = {
  SCHEDULED: '予定',
  IN_PROGRESS: '進行中',
  COMPLETED: '完了',
  CANCELLED: 'キャンセル',
} as const satisfies Record<string, Database['public']['Enums']['lesson_status']>;

export type LessonStatusType = typeof LessonStatus[keyof typeof LessonStatus];
