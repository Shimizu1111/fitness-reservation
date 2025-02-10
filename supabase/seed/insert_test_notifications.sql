-- 通知データの挿入
WITH customers AS (
  SELECT id FROM fitness_reservation_users WHERE role_id = 3 ORDER BY created_at LIMIT 3
)
INSERT INTO fitness_reservation_notifications (
    user_id, title, content, notification_type
)
VALUES
  ((SELECT id FROM customers LIMIT 1 OFFSET 0), '予約確定のお知らせ', 'あなたの予約が確定しました。', 1),
  ((SELECT id FROM customers LIMIT 1 OFFSET 1), '予約キャンセルのお知らせ', 'あなたの予約がキャンセルされました。', 2),
  ((SELECT id FROM customers LIMIT 1 OFFSET 2), '予約枠が空きました', 'ご希望のレッスンに空きが出ました。', 3);
