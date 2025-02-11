export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      fitness_reservation_lessons: {
        Row: {
          created_at: string | null
          id: number
          location: number
          max_participants: number
          memo: string | null
          name: string
          scheduled_end_at: string
          scheduled_start_at: string
          status: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          location: number
          max_participants: number
          memo?: string | null
          name: string
          scheduled_end_at: string
          scheduled_start_at: string
          status: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          location?: number
          max_participants?: number
          memo?: string | null
          name?: string
          scheduled_end_at?: string
          scheduled_start_at?: string
          status?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fitness_reservation_lessons_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "fitness_reservation_users"
            referencedColumns: ["id"]
          },
        ]
      }
      fitness_reservation_notifications: {
        Row: {
          content: string
          created_at: string | null
          id: number
          is_read: boolean
          notification_type: number
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: number
          is_read?: boolean
          notification_type: number
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: number
          is_read?: boolean
          notification_type?: number
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fitness_reservation_notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "fitness_reservation_users"
            referencedColumns: ["id"]
          },
        ]
      }
      fitness_reservation_reservations: {
        Row: {
          attended: boolean | null
          cancelled_at: string | null
          created_at: string | null
          id: number
          lesson_id: number
          reserved_at: string
          status: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          attended?: boolean | null
          cancelled_at?: string | null
          created_at?: string | null
          id?: number
          lesson_id: number
          reserved_at?: string
          status: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          attended?: boolean | null
          cancelled_at?: string | null
          created_at?: string | null
          id?: number
          lesson_id?: number
          reserved_at?: string
          status?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fitness_reservation_reservations_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "fitness_reservation_lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fitness_reservation_reservations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "fitness_reservation_users"
            referencedColumns: ["id"]
          },
        ]
      }
      fitness_reservation_users: {
        Row: {
          address: string | null
          cancellation_reason: string | null
          created_at: string | null
          email: string
          id: string
          join_date: string
          name: string
          password: string
          phone: string | null
          role_id: number
          status: number
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          cancellation_reason?: string | null
          created_at?: string | null
          email: string
          id?: string
          join_date?: string
          name: string
          password: string
          phone?: string | null
          role_id: number
          status: number
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          cancellation_reason?: string | null
          created_at?: string | null
          email?: string
          id?: string
          join_date?: string
          name?: string
          password?: string
          phone?: string | null
          role_id?: number
          status?: number
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_access_fitness_user: {
        Args: {
          user_id: string
          target_id: string
          target_role: number
        }
        Returns: boolean
      }
      get_customers_for_owner: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          role_id: number
          name: string
          email: string
          phone: string
          address: string
          status: number
          cancellation_reason: string
          join_date: string
          reservation_count: number
          latest_reserved_at: string
        }[]
      }
      get_lessons_for_owner: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          name: string
          scheduled_start_at: string
          scheduled_end_at: string
          location: number
          status: number
          memo: string
          max_participants: number
          participants_count: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
