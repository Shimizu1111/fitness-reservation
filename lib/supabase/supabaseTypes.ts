export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      fitness_reservation_lessons: {
        Row: {
          created_at: string | null;
          id: number;
          location: Database['public']['Enums']['lesson_location'];
          max_participants: number;
          memo: string | null;
          name: string;
          scheduled_end_at: string;
          scheduled_start_at: string;
          status: Database['public']['Enums']['lesson_status'];
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          location: Database['public']['Enums']['lesson_location'];
          max_participants: number;
          memo?: string | null;
          name: string;
          scheduled_end_at: string;
          scheduled_start_at: string;
          status: Database['public']['Enums']['lesson_status'];
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          location?: Database['public']['Enums']['lesson_location'];
          max_participants?: number;
          memo?: string | null;
          name?: string;
          scheduled_end_at?: string;
          scheduled_start_at?: string;
          status?: Database['public']['Enums']['lesson_status'];
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'fitness_reservation_lessons_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'fitness_reservation_users';
            referencedColumns: ['id'];
          },
        ];
      };
      fitness_reservation_notifications: {
        Row: {
          content: string;
          created_at: string | null;
          id: number;
          is_read: boolean;
          notification_type: Database['public']['Enums']['notification_type'];
          title: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string | null;
          id?: number;
          is_read?: boolean;
          notification_type: Database['public']['Enums']['notification_type'];
          title: string;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string | null;
          id?: number;
          is_read?: boolean;
          notification_type?: Database['public']['Enums']['notification_type'];
          title?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'fitness_reservation_notifications_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'fitness_reservation_users';
            referencedColumns: ['id'];
          },
        ];
      };
      fitness_reservation_reservations: {
        Row: {
          attended: boolean | null;
          cancelled_at: string | null;
          created_at: string | null;
          id: number;
          lesson_id: number;
          reserved_at: string;
          status: Database['public']['Enums']['reservation_status'];
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          attended?: boolean | null;
          cancelled_at?: string | null;
          created_at?: string | null;
          id?: number;
          lesson_id: number;
          reserved_at?: string;
          status: Database['public']['Enums']['reservation_status'];
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          attended?: boolean | null;
          cancelled_at?: string | null;
          created_at?: string | null;
          id?: number;
          lesson_id?: number;
          reserved_at?: string;
          status?: Database['public']['Enums']['reservation_status'];
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'fitness_reservation_reservations_lesson_id_fkey';
            columns: ['lesson_id'];
            isOneToOne: false;
            referencedRelation: 'fitness_reservation_lessons';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fitness_reservation_reservations_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'fitness_reservation_users';
            referencedColumns: ['id'];
          },
        ];
      };
      fitness_reservation_users: {
        Row: {
          address: string | null;
          cancellation_reason: string | null;
          created_at: string | null;
          customer_status:
            | Database['public']['Enums']['customer_status']
            | null;
          email: string;
          id: string;
          join_date: string;
          name: string;
          owner_status: Database['public']['Enums']['owner_status'] | null;
          password: string;
          phone: string | null;
          role: Database['public']['Enums']['user_role'];
          trainer_status: Database['public']['Enums']['trainer_status'] | null;
          updated_at: string | null;
        };
        Insert: {
          address?: string | null;
          cancellation_reason?: string | null;
          created_at?: string | null;
          customer_status?:
            | Database['public']['Enums']['customer_status']
            | null;
          email: string;
          id?: string;
          join_date?: string;
          name: string;
          owner_status?: Database['public']['Enums']['owner_status'] | null;
          password: string;
          phone?: string | null;
          role: Database['public']['Enums']['user_role'];
          trainer_status?: Database['public']['Enums']['trainer_status'] | null;
          updated_at?: string | null;
        };
        Update: {
          address?: string | null;
          cancellation_reason?: string | null;
          created_at?: string | null;
          customer_status?:
            | Database['public']['Enums']['customer_status']
            | null;
          email?: string;
          id?: string;
          join_date?: string;
          name?: string;
          owner_status?: Database['public']['Enums']['owner_status'] | null;
          password?: string;
          phone?: string | null;
          role?: Database['public']['Enums']['user_role'];
          trainer_status?: Database['public']['Enums']['trainer_status'] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_access_fitness_user: {
        Args: {
          user_id: string;
          target_id: string;
          target_role: Database['public']['Enums']['user_role'];
        };
        Returns: boolean;
      };
      get_customers_for_owner: {
        Args: Record<PropertyKey, never>;
        Returns: {
          id: string;
          role: Database['public']['Enums']['user_role'];
          name: string;
          email: string;
          phone: string;
          address: string;
          owner_status: Database['public']['Enums']['owner_status'];
          trainer_status: Database['public']['Enums']['trainer_status'];
          customer_status: Database['public']['Enums']['customer_status'];
          cancellation_reason: string;
          join_date: string;
          reservation_count: number;
          latest_reserved_at: string;
        }[];
      };
      get_lessons_for_owner: {
        Args: Record<PropertyKey, never>;
        Returns: {
          id: number;
          name: string;
          scheduled_start_at: string;
          scheduled_end_at: string;
          location: Database['public']['Enums']['lesson_location'];
          status: Database['public']['Enums']['lesson_status'];
          memo: string;
          max_participants: number;
          user_id: string;
          user_name: string;
          participants_count: number;
        }[];
      };
    };
    Enums: {
      customer_status: 'アクティブ' | '休会' | '退会';
      lesson_location: 'スタジオA' | 'スタジオB' | 'オンライン';
      lesson_status: '予定' | '進行中' | '完了' | 'キャンセル';
      notification_type: '予約確定' | '予約キャンセル' | '予約枠が空いた';
      owner_status: 'アクティブ' | '一時停止' | '停止';
      reservation_status: '予約確定' | 'キャンセル待ち' | 'キャンセル済み';
      trainer_status: 'アクティブ' | '一時停止' | '停止';
      user_role: 'オーナー' | 'トレーナー' | '顧客';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;
