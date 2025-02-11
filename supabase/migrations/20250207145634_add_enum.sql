CREATE TYPE lesson_location AS ENUM ('スタジオA', 'スタジオB', 'オンライン');

CREATE TYPE lesson_status AS ENUM ('予定', '進行中', '完了', 'キャンセル');

CREATE TYPE owner_status AS ENUM ('アクティブ', '一時停止', '停止');

CREATE TYPE trainer_status AS ENUM ('アクティブ', '一時停止', '停止');

CREATE TYPE customer_status AS ENUM ('アクティブ', '休会', '退会');

CREATE TYPE user_role AS ENUM ('オーナー', 'トレーナー', '顧客');

CREATE TYPE reservation_status AS ENUM ('予約確定', 'キャンセル待ち', 'キャンセル済み');

CREATE TYPE notification_type AS ENUM ('予約確定', '予約キャンセル', '予約枠が空いた');
