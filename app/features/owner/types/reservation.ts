import { ReservationStatusType } from "../constants/reservation";
import { MemberStatusType } from "./member";

export interface Reservation {
  id: number;
  lessonId: number;
  userId: string;
  status: ReservationStatusType;
  attended: boolean | null;
  reservedAt: string;
  cancelledAt: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

