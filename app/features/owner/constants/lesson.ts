import { Database } from '@/lib/supabase/types';

export const LessonStatus = {
  SCHEDULED: '予定',
  IN_PROGRESS: '進行中',
  COMPLETED: '完了',
  CANCELLED: 'キャンセル',
} as const;

export type DatabaseLessonStatusType = typeof LessonStatus[keyof typeof LessonStatus];

export const LessonLocation = {
  STUDIO_A: 1,
  STUDIO_B: 2,
  ONLINE: 3,
} as const;

export const LessonLocationString = {
  [LessonLocation.STUDIO_A]: 'スタジオA',
  [LessonLocation.STUDIO_B]: 'スタジオB',
  [LessonLocation.ONLINE]: 'オンライン',
} as const;

export type LessonLocationType = typeof LessonLocation[keyof typeof LessonLocation];
