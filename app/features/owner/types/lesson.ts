import { LessonLocationType, LessonStatusType } from "../constants/lesson";

export interface Lesson {
  id: number;
  lessonTypeId: number;
  trainerId: string;
  scheduledStartAt: string;
  scheduledEndAt: string;
  maxParticipants: number;
  location: LessonLocationType;
  status: LessonStatusType;
  memo: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

 