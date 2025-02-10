-- 予約データの挿入
WITH customers AS (
  SELECT id FROM fitness_reservation_users WHERE role_id = 3 ORDER BY created_at LIMIT 3
),
lessons AS (
  SELECT id FROM fitness_reservation_lessons ORDER BY scheduled_start_at LIMIT 3
)
INSERT INTO fitness_reservation_reservations (
    lesson_id, user_id, status, attended
)
VALUES
  ((SELECT id FROM lessons LIMIT 1 OFFSET 0), (SELECT id FROM customers LIMIT 1 OFFSET 0), 1, true),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 1), (SELECT id FROM customers LIMIT 1 OFFSET 1), 1, false),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 2), (SELECT id FROM customers LIMIT 1 OFFSET 2), 2, NULL);


-- レッスンの追加データ
WITH customers AS (
  SELECT id FROM fitness_reservation_users WHERE id IN ('056be071-9bba-43a7-9a70-87f04f0708e4', '0e8cabb4-334d-4a4f-92dc-5e8ee642708c', '1e17b30c-20b3-48b2-9c5d-e2846f9b639e')
),
lessons AS (
  SELECT id FROM fitness_reservation_lessons ORDER BY scheduled_start_at LIMIT 3
)
INSERT INTO fitness_reservation_reservations (
    lesson_id, user_id, status, attended
)
VALUES
  ((SELECT id FROM lessons LIMIT 1 OFFSET 0), (SELECT id FROM customers LIMIT 1 OFFSET 0), 1, true),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 1), (SELECT id FROM customers LIMIT 1 OFFSET 1), 1, false),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 2), (SELECT id FROM customers LIMIT 1 OFFSET 2), 2, NULL),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 0), (SELECT id FROM customers LIMIT 1 OFFSET 1), 1, true),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 1), (SELECT id FROM customers LIMIT 1 OFFSET 2), 2, false),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 2), (SELECT id FROM customers LIMIT 1 OFFSET 0), 1, true),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 0), (SELECT id FROM customers LIMIT 1 OFFSET 2), 2, NULL),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 1), (SELECT id FROM customers LIMIT 1 OFFSET 0), 1, false),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 2), (SELECT id FROM customers LIMIT 1 OFFSET 1), 2, true),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 0), (SELECT id FROM customers LIMIT 1 OFFSET 1), 1, NULL),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 1), (SELECT id FROM customers LIMIT 1 OFFSET 2), 2, true),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 2), (SELECT id FROM customers LIMIT 1 OFFSET 0), 1, false),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 0), (SELECT id FROM customers LIMIT 1 OFFSET 2), 2, true),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 1), (SELECT id FROM customers LIMIT 1 OFFSET 0), 1, true),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 2), (SELECT id FROM customers LIMIT 1 OFFSET 1), 2, NULL),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 0), (SELECT id FROM customers LIMIT 1 OFFSET 0), 1, false),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 1), (SELECT id FROM customers LIMIT 1 OFFSET 1), 2, true),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 2), (SELECT id FROM customers LIMIT 1 OFFSET 2), 1, true),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 0), (SELECT id FROM customers LIMIT 1 OFFSET 1), 1, false),
  ((SELECT id FROM lessons LIMIT 1 OFFSET 1), (SELECT id FROM customers LIMIT 1 OFFSET 0), 2, NULL);
