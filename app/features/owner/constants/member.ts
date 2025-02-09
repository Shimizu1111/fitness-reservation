import { mapValueToString } from "@/app/utils/mappingUtils";

export const MemberStatus = {
  // アクティブ
  ACTIVE: 1,
  // 休会
  SUSPENDED: 2,
  // 退会
  CANCELLED: 3,
} as const;

export const MemberStatusString = {
  [MemberStatus.ACTIVE]: 'アクティブ',
  [MemberStatus.SUSPENDED]: '休会',
  [MemberStatus.CANCELLED]: '退会',
} as const;

export type MemberStatusType = typeof MemberStatus[keyof typeof MemberStatus];
export type MemberStatusStringType = typeof MemberStatusString[keyof typeof MemberStatusString];

// ステータスを文字列に変換する関数
export const getMemberStatusString = (status: MemberStatusType): MemberStatusStringType => {
  return mapValueToString(MemberStatusString, status) as MemberStatusStringType;
};
