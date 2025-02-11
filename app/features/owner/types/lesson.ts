import { LessonLocationType, LessonStatusType } from "../constants/lesson";
import { Member } from "./member";

export interface Lesson {
  id: number;
  name: string;
  trainer: Member;
  scheduledStartAt: string;
  scheduledEndAt: string;
  maxParticipants: number;
  location: LessonLocationType;
  status: LessonStatusType;
  memo: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

 