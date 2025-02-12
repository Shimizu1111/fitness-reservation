import { Database } from "@/lib/supabase/supabaseTypes";

export interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
}

export interface CustomerFilters {
  searchQuery: string;
  statusFilter: 'all' | Database['public']['Enums']['customer_status'];
  sortField: keyof Database['public']['Functions']['get_customers_for_owner']['Returns'][number];
  sortOrder: 'asc' | 'desc';
} 