import { mapValueToString } from "@/app/utils/mappingUtils";

export const CustomerStatus = {
  // アクティブ
  ACTIVE: 1,
  // 休会
  SUSPENDED: 2,
  // 退会
  CANCELLED: 3,
} as const;

export const CustomerStatusString = {
  [CustomerStatus.ACTIVE]: 'アクティブ',
  [CustomerStatus.SUSPENDED]: '休会',
  [CustomerStatus.CANCELLED]: '退会',
} as const;

export type CustomerStatusType = typeof CustomerStatus[keyof typeof CustomerStatus];
export type CustomerStatusStringType = typeof CustomerStatusString[keyof typeof CustomerStatusString];

// ステータスを文字列に変換する関数
export const getCustomerStatusString = (status: CustomerStatusType): CustomerStatusStringType => {
  return mapValueToString(CustomerStatusString, status) as CustomerStatusStringType;
};

export const UserRole = {
  OWNER: 1,      // オーナー
  TRAINER: 2,    // トレーナー
  CUSTOMER: 3,   // 顧客
} as const;

export type UserRoleType = typeof UserRole[keyof typeof UserRole];
