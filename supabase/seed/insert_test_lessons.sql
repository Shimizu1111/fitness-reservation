-- レッスンデータの挿入
WITH trainer AS (
  SELECT id FROM fitness_reservation_users WHERE role_id = 2 LIMIT 1
),
lesson_types AS (
  SELECT id, name FROM fitness_reservation_lesson_types
)
INSERT INTO fitness_reservation_lessons (
    trainer_id, lesson_type_id, scheduled_start_at, scheduled_end_at, 
    max_participants, location, status, memo
)
VALUES
  ((SELECT id FROM trainer), (SELECT id FROM lesson_types WHERE name = 'ヨガ'), now() + interval '1 day', now() + interval '1 day 1 hour', 10, 1, 1, '初心者向けヨガ'),
  ((SELECT id FROM trainer), (SELECT id FROM lesson_types WHERE name = 'ピラティス'), now() + interval '2 days', now() + interval '2 days 1 hour', 8, 2, 1, '体幹強化ピラティス'),
  ((SELECT id FROM trainer), (SELECT id FROM lesson_types WHERE name = '筋トレ'), now() + interval '3 days', now() + interval '3 days 1 hour', 12, 3, 1, '全身筋トレクラス');
