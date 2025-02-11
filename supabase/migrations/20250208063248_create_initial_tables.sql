CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ユーザーテーブル
create table fitness_reservation_users (
    id uuid primary key default uuid_generate_v4(), -- ユーザーの一意なID（UUID）
    role user_role not null, -- ユーザーの役割
    name text not null, -- ユーザーの名前
    password text not null, -- ハッシュ化されたパスワード（アプリ側でハッシュ化）
    email text not null unique, -- ユーザーのメールアドレス（ユニーク制約あり）
    phone text, -- ユーザーの電話番号（オプション）
    address text, -- ユーザーの住所（オプション）
    owner_status owner_status,        -- オーナー用ステータス
    trainer_status trainer_status,    -- トレーナー用ステータス
    customer_status customer_status, -- 顧客用ステータス
    cancellation_reason text, -- 退会理由（退会済みユーザーのみ設定）
    join_date timestamp with time zone default now() not null, -- 入会日
    created_at timestamp with time zone default now(), -- ユーザー登録日時
    updated_at timestamp with time zone default now() -- 最終更新日時
);

-- レッスンテーブル
create table fitness_reservation_lessons (
    id bigserial primary key, -- レッスンの一意なID（連番）
    name text not null, -- レッスンの名前
    user_id uuid not null references fitness_reservation_users(id) on delete cascade, -- 担当トレーナーのID（外部キー）
    scheduled_start_at timestamp with time zone not null, -- レッスン開始時間
    scheduled_end_at timestamp with time zone not null, -- レッスン終了時間
    max_participants smallint not null, -- 最大参加人数
    location lesson_location not null, -- レッスンの開催場所
    status lesson_status not null, -- レッスンのステータス
    memo text, -- レッスンのメモ（オプション）
    created_at timestamp with time zone default now(), -- レッスン作成日時
    updated_at timestamp with time zone default now() -- 最終更新日時
);

-- 予約テーブル
create table fitness_reservation_reservations (
    id bigserial primary key, -- 予約の一意なID（連番）
    lesson_id bigint not null references fitness_reservation_lessons(id) on delete cascade, -- 予約したレッスンのID（外部キー）
    user_id uuid not null references fitness_reservation_users(id) on delete cascade, -- 予約者のユーザーID（外部キー）
    status reservation_status not null, -- 予約のステータス
    attended boolean, -- 出席状況（true: 出席, false: 欠席, NULL: 未確定）
    reserved_at timestamp with time zone not null default now(), -- 予約日時
    cancelled_at timestamp with time zone, -- キャンセル日時（キャンセル時のみセット）
    created_at timestamp with time zone default now(), -- 予約作成日時
    updated_at timestamp with time zone default now() -- 最終更新日時
);

-- 通知テーブル
create table fitness_reservation_notifications (
    id bigserial primary key, -- 通知の一意なID（連番）
    user_id uuid not null references fitness_reservation_users(id) on delete cascade, -- 通知対象のユーザーID（外部キー）
    title text not null, -- 通知タイトル
    content text not null, -- 通知内容
    notification_type notification_type not null, -- 通知の種類
    is_read boolean not null default false, -- 既読フラグ（true: 既読, false: 未読）
    created_at timestamp with time zone default now(), -- 通知作成日時
    updated_at timestamp with time zone default now() -- 最終更新日時
);

-- ユーザーテーブルのRLS有効化
ALTER TABLE fitness_reservation_users ENABLE ROW LEVEL SECURITY;

-- レッスンテーブルのRLS有効化
ALTER TABLE fitness_reservation_lessons ENABLE ROW LEVEL SECURITY;

-- 予約テーブルのRLS有効化
ALTER TABLE fitness_reservation_reservations ENABLE ROW LEVEL SECURITY;

-- 通知テーブルのRLS有効化
ALTER TABLE fitness_reservation_notifications ENABLE ROW LEVEL SECURITY;

-- アクセス制御関数
CREATE OR REPLACE FUNCTION can_access_fitness_user(user_id uuid, target_id uuid, target_role user_role)
RETURNS boolean AS $$
BEGIN
    RETURN (
        -- オーナー: 全データにアクセス可能
        (SELECT role FROM fitness_reservation_users WHERE id = user_id) = 'オーナー'

        -- トレーナー: 自分のデータと全顧客データにアクセス可能
        OR (user_id = target_id AND target_role = 'トレーナー')
        OR (target_role = '顧客' AND (SELECT role FROM fitness_reservation_users WHERE id = user_id) = 'トレーナー')

        -- 顧客: 自分のデータにのみアクセス可能
        OR (user_id = target_id AND target_role = '顧客')
    );
END;
$$ LANGUAGE plpgsql;

-- ユーザーごとの操作を制御するポリシー
CREATE POLICY "ユーザーごとの全操作制御"
ON fitness_reservation_users
FOR ALL
USING (
    auth.uid() IS NOT NULL AND 
    can_access_fitness_user(auth.uid(), id, role)
)
WITH CHECK (
    auth.uid() IS NOT NULL AND 
    can_access_fitness_user(auth.uid(), id, role)
);

-- レッスンの操作を制御するポリシー
CREATE POLICY "レッスンの参照制御" -- 全ユーザーがレッスンを参照可能
ON fitness_reservation_lessons
FOR SELECT
USING (true);

CREATE POLICY "トレーナーのレッスン編集" -- トレーナーは自分のレッスンを編集可能
ON fitness_reservation_lessons
FOR UPDATE
USING (
    (SELECT role FROM fitness_reservation_users WHERE id = auth.uid()) = 'トレーナー'
    AND user_id = auth.uid()
);

CREATE POLICY "トレーナーのレッスン削除" -- トレーナーは自分のレッスンを削除可能
ON fitness_reservation_lessons
FOR DELETE
USING (
    (SELECT role FROM fitness_reservation_users WHERE id = auth.uid()) = 'トレーナー'
    AND user_id = auth.uid()
);

CREATE POLICY "オーナーのレッスン管理" -- オーナーは全てのレッスンを作成・編集・削除可能
ON fitness_reservation_lessons
FOR ALL
USING ((SELECT role FROM fitness_reservation_users WHERE id = auth.uid()) = 'オーナー')
WITH CHECK ((SELECT role FROM fitness_reservation_users WHERE id = auth.uid()) = 'オーナー');

-- 予約の操作を制御するポリシー
CREATE POLICY "顧客の予約管理" -- 顧客が自分の予約を操作可能
ON fitness_reservation_reservations
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "トレーナーの予約参照" -- トレーナーは自分のレッスンの予約を参照可能
ON fitness_reservation_reservations
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM fitness_reservation_lessons
        WHERE fitness_reservation_lessons.id = fitness_reservation_reservations.lesson_id
        AND user_id = auth.uid()
    )
);

CREATE POLICY "オーナーの予約管理" -- オーナーが全ての予約を管理可能
ON fitness_reservation_reservations
FOR ALL
USING ((SELECT role FROM fitness_reservation_users WHERE id = auth.uid()) = 'オーナー')
WITH CHECK ((SELECT role FROM fitness_reservation_users WHERE id = auth.uid()) = 'オーナー');

-- 通知設定の操作を制御するポリシー
CREATE POLICY "顧客の通知参照" -- 自分宛の通知のみ参照可能
ON fitness_reservation_notifications
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "オーナーの通知管理" -- オーナーは全ての通知を管理可能
ON fitness_reservation_notifications
FOR ALL
USING ((SELECT role FROM fitness_reservation_users WHERE id = auth.uid()) = 'オーナー')
WITH CHECK ((SELECT role FROM fitness_reservation_users WHERE id = auth.uid()) = 'オーナー');
