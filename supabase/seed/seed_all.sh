#!/bin/bash

if [ "$SUPABASE_ENV" != "development" ]; then
  echo "This script should only be run in development environment!"
  exit 1
fi

# usersテーブル
echo "Inserting test users..."
supabase db execute ./supabase/seed/insert_test_users.sql

# lesson_typesテーブル
echo "Inserting test lesson types..."
supabase db execute ./supabase/seed/insert_test_lesson_types.sql

# lessonsテーブル
echo "Inserting test lessons..."
supabase db execute ./supabase/seed/insert_test_lessons.sql

# reservationsテーブル
echo "Inserting test reservations..."
supabase db execute ./supabase/seed/insert_test_reservations.sql

# notificationsテーブル
echo "Inserting test notifications..."
supabase db execute ./supabase/seed/insert_test_notifications.sql

echo "All seeding operations completed successfully!"