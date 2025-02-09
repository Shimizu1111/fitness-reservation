import { MemberStatusType } from "../constants/member";

export interface Member {
  id: string; // UUID
  name: string; // ユーザーの名前
  email: string; // ユーザーのメールアドレス
  phone: string | null; // ユーザーの電話番号（オプション）
  address: string | null; // ユーザーの住所（オプション）
  joinDate: string | null; // 入会日
  totalLessons: number; // 受講回数
  lastLesson: string | null; // 最終受講日
  status: MemberStatusType; // ステータス
  cancellationReason: string | null; // 退会理由（退会済みユーザーのみ設定）
  createdAt: string | null; // ユーザー登録日時
  updatedAt: string | null; // 最終更新日時
}

export interface MemberFormData {
  name: string; // ユーザーの名前
  email: string; // ユーザーのメールアドレス
  phone: string; // ユーザーの電話番号
}

export interface MemberFilters {
  searchQuery: string; // 検索クエリ
  statusFilter: 'all' | 'active' | 'inactive'; // ステータスフィルター
  sortField: keyof Member; // ソートフィールド
  sortOrder: 'asc' | 'desc'; // ソート順
}