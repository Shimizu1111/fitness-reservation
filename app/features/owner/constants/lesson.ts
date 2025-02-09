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

export const LessonStatus = {
  SCHEDULED: 1,
  IN_PROGRESS: 2,
  COMPLETED: 3,
  CANCELLED: 4,
} as const;

export const LessonStatusString = {
  [LessonStatus.SCHEDULED]: '予定',
  [LessonStatus.IN_PROGRESS]: '進行中',
  [LessonStatus.COMPLETED]: '完了',
  [LessonStatus.CANCELLED]: 'キャンセル',
} as const;

export type LessonLocationType = typeof LessonLocation[keyof typeof LessonLocation];
export type LessonStatusType = typeof LessonStatus[keyof typeof LessonStatus];
