-- レッスン予約データの挿入
WITH customers AS (
  SELECT id FROM fitness_reservation_users WHERE role = '顧客' ORDER BY RANDOM() LIMIT 3
),
lessons AS (
  SELECT id FROM fitness_reservation_lessons ORDER BY scheduled_start_at LIMIT 3
)
INSERT INTO fitness_reservation_reservations (
    lesson_id, user_id, status, attended
)
VALUES
  ((SELECT id FROM lessons LIMIT 1 OFFSET 0), (SELECT id FROM customers LIMIT 1 OFFSET 0), '予約確定', true),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 1), (SELECT id FROM customers LIMIT 1 OFFSET 1), '予約確定', false),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 2), (SELECT id FROM customers LIMIT 1 OFFSET 2), 'キャンセル済み', NULL),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 0), (SELECT id FROM customers LIMIT 1 OFFSET 1), '予約確定', true),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 1), (SELECT id FROM customers LIMIT 1 OFFSET 2), 'キャンセル済み', false),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 2), (SELECT id FROM customers LIMIT 1 OFFSET 0), '予約確定', true),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 0), (SELECT id FROM customers LIMIT 1 OFFSET 2), 'キャンセル済み', NULL),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 1), (SELECT id FROM customers LIMIT 1 OFFSET 0), '予約確定', false),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 2), (SELECT id FROM customers LIMIT 1 OFFSET 1), 'キャンセル済み', true),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 0), (SELECT id FROM customers LIMIT 1 OFFSET 1), '予約確定', NULL),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 1), (SELECT id FROM customers LIMIT 1 OFFSET 2), 'キャンセル済み', true),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 2), (SELECT id FROM customers LIMIT 1 OFFSET 0), '予約確定', false),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 0), (SELECT id FROM customers LIMIT 1 OFFSET 2), 'キャンセル済み', true),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 1), (SELECT id FROM customers LIMIT 1 OFFSET 0), '予約確定', true),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 2), (SELECT id FROM customers LIMIT 1 OFFSET 1), 'キャンセル済み', NULL),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 0), (SELECT id FROM customers LIMIT 1 OFFSET 0), '予約確定', false),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 1), (SELECT id FROM customers LIMIT 1 OFFSET 1), 'キャンセル済み', true),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 2), (SELECT id FROM customers LIMIT 1 OFFSET 2), '予約確定', true),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 0), (SELECT id FROM customers LIMIT 1 OFFSET 1), '予約確定', false),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 1), (SELECT id FROM customers LIMIT 1 OFFSET 0), 'キャンセル済み', NULL);