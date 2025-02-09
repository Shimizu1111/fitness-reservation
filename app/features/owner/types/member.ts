import { MemberStatus } from "../constants/member";

export type MemberStatusType = typeof MemberStatus[keyof typeof MemberStatus];
export type MemberStatusStringType = string;

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  joinDate: string | null;
  totalLessons: number;
  lastLesson: string | null;
  status: MemberStatusType;
  cancellationReason: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface MemberFormData {
  name: string;
  email: string;
  phone: string;
}

export interface MemberFilters {
  searchQuery: string;
  statusFilter: 'all' | MemberStatusType;
  sortField: keyof Member;
  sortOrder: 'asc' | 'desc';
} 