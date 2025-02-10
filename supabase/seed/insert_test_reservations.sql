-- レッスンの追加データ
WITH customers AS (
  SELECT id FROM fitness_reservation_users WHERE role_id = 3 ORDER BY RANDOM() LIMIT 3
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
