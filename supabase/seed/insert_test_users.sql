-- ユーザーデータの挿入
INSERT INTO fitness_reservation_users (
    id, role, name, password, email, phone, address, owner_status, trainer_status, customer_status, cancellation_reason, join_date
)
VALUES
  (uuid_generate_v4(), 'オーナー', 'オーナー 太郎', 'hashed_password1', 'owner@example.com', '090-0000-0001', '東京都渋谷区1-1-1', 'アクティブ', NULL, NULL, NULL, '2023-01-15T09:00:00+09:00'),
  (uuid_generate_v4(), 'トレーナー', 'トレーナー 花子', 'hashed_password2', 'trainer@example.com', '090-0000-0002', '東京都新宿区2-2-2', NULL, 'アクティブ', NULL, NULL, '2023-03-20T10:00:00+09:00'),
  (uuid_generate_v4(), '顧客', '顧客 一郎', 'hashed_password3', 'customer1@example.com', '090-0000-0003', '東京都世田谷区3-3-3', NULL, NULL, 'アクティブ', NULL, '2023-05-10T11:00:00+09:00'),
  (uuid_generate_v4(), '顧客', '顧客 二郎', 'hashed_password4', 'customer2@example.com', '090-0000-0004', '東京都杉並区4-4-4', NULL, NULL, '休会', NULL, '2023-07-25T14:00:00+09:00'),
  (uuid_generate_v4(), '顧客', '顧客 三郎', 'hashed_password5', 'customer3@example.com', '090-0000-0005', '東京都中野区5-5-5', NULL, NULL, '退会', 'サービスに満足できなかった', '2023-09-30T16:00:00+09:00');
