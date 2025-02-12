import { Database } from '@/lib/supabase/supabaseTypes';

type CustomerStatusType = Database['public']['Enums']['customer_status'];

export const CustomerStatus = {
  ACTIVE: 'アクティブ',
  SUSPENDED: '休会',
  CANCELLED: '退会',
} as const satisfies Record<string, CustomerStatusType>;

export const statusActions: Record<
  CustomerStatusType,
  { label: string; nextStatus: CustomerStatusType }[]
> = {
  アクティブ: [
    { label: '休会', nextStatus: '休会' },
    { label: '退会', nextStatus: '退会' },
  ],
  休会: [
    { label: '再開', nextStatus: 'アクティブ' },
    { label: '退会', nextStatus: '退会' },
  ],
  退会: [
    { label: '再開', nextStatus: 'アクティブ' },
    { label: '休会', nextStatus: '休会' },
  ],
};
