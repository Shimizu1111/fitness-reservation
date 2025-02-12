import { CustomerStatus } from "../constants/customer";

export type CustomerStatusType = typeof CustomerStatus[keyof typeof CustomerStatus];
export type CustomerStatusStringType = string;

export interface Customer {
  id: string;
  roleId: number;
  name: string;
  password: string | null;
  email: string;
  phone: string | null;
  address: string | null;
  status: CustomerStatusType;
  cancellationReason: string | null;
  joinDate: string | null;
  totalLessons: number | null;
  lastLesson: string | null;
}

export interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
}

export interface CustomerFilters {
  searchQuery: string;
  statusFilter: 'all' | CustomerStatusType;
  sortField: keyof Customer;
  sortOrder: 'asc' | 'desc';
} 