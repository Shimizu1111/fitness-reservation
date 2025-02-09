export const ReservationStatus = {
  CONFIRMED: 1,
  WAITLISTED: 2,
  CANCELLED: 3,
} as const;

export const ReservationStatusString = {
  [ReservationStatus.CONFIRMED]: '予約確定',
  [ReservationStatus.WAITLISTED]: 'キャンセル待ち',
  [ReservationStatus.CANCELLED]: 'キャンセル済み',
} as const;

export type ReservationStatusType = typeof ReservationStatus[keyof typeof ReservationStatus]; 
