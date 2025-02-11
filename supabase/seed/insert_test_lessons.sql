-- レッスンデータの挿入
WITH trainer AS (
  SELECT id FROM fitness_reservation_users WHERE role = 'トレーナー' LIMIT 1
)
INSERT INTO fitness_reservation_lessons (
    user_id, name, scheduled_start_at, scheduled_end_at, 
    max_participants, location, status, memo
)
VALUES
  ((SELECT id FROM trainer), 'ヨガ', now() + interval '1 day', now() + interval '1 day 1 hour', 10, 'スタジオA', '予定', '初心者向けヨガ'),
  ((SELECT id FROM trainer), 'ピラティス', now() + interval '2 days', now() + interval '2 days 1 hour', 8, 'スタジオB', '予定', '体幹強化ピラティス'),
  ((SELECT id FROM trainer), '筋トレ', now() + interval '3 days', now() + interval '3 days 1 hour', 12, 'オンライン', '予定', '全身筋トレクラス'),
  ((SELECT id FROM trainer), 'バレエ', now() + interval '4 days', now() + interval '4 days 1 hour', 15, 'スタジオA', '予定', 'バレエ初心者クラス'),
  ((SELECT id FROM trainer), 'サーキットトレーニング', now() + interval '5 days', now() + interval '5 days 1 hour', 20, 'スタジオB', '進行中', '高強度インターバルトレーニング'),
  ((SELECT id FROM trainer), 'ストレッチ', now() + interval '6 days', now() + interval '6 days 1 hour', 10, 'オンライン', '完了', '全身ストレッチ'),
  ((SELECT id FROM trainer), 'エアロビクス', now() + interval '7 days', now() + interval '7 days 1 hour', 25, 'スタジオA', '予定', '楽しくエアロビ'),
  ((SELECT id FROM trainer), 'ダンス', now() + interval '8 days', now() + interval '8 days 1 hour', 18, 'スタジオB', '進行中', '初心者ダンスクラス'),
  ((SELECT id FROM trainer), 'ランニング', now() + interval '9 days', now() + interval '9 days 1 hour', 30, 'オンライン', '予定', 'ランニング初心者向け'),

  -- 同じnameとuser_idでscheduled_start_atだけ異なるケース
  ((SELECT id FROM trainer), 'ヨガ', now() + interval '1 day 2 hours', now() + interval '1 day 3 hours', 10, 'スタジオA', '予定', '初心者向けヨガ（遅い時間帯）'),
  ((SELECT id FROM trainer), 'ピラティス', now() + interval '2 days 2 hours', now() + interval '2 days 3 hours', 8, 'スタジオB', '予定', '体幹強化ピラティス（遅い時間帯）'),
  ((SELECT id FROM trainer), '筋トレ', now() + interval '3 days 2 hours', now() + interval '3 days 3 hours', 12, 'オンライン', '予定', '全身筋トレクラス（遅い時間帯）');

