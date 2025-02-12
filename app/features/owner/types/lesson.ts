import { LessonLocationType, LessonStatusType } from "../constants/lesson";
import { Customer } from "./customer";

export interface Lesson {
  id: number;
  name: string;
  trainer: Customer;
  scheduledStartAt: string;
  scheduledEndAt: string;
  maxParticipants: number;
  location: LessonLocationType;
  status: LessonStatusType;
  memo: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

 