#!/bin/bash

# 引数で環境を指定: local または prd
ENVIRONMENT=$1
SQL_DIR="./supabase/seed"

# 環境が指定されていない場合はエラー
if [ -z "$ENVIRONMENT" ]; then
  echo "❌ Error: No environment specified."
  echo "Usage: ./scripts/execute_sql.sh [local|prd]"
  exit 1
fi

# 環境ごとに.envファイルを読み込む
if [ "$ENVIRONMENT" = "local" ]; then
  if [ -f .env.local ]; then
    source .env.local
  else
    echo "❌ .env.local file not found!"
    exit 1
  fi
elif [ "$ENVIRONMENT" = "prd" ]; then
  if [ -f .env.prd ]; then
    source .env.prd
    echo "⚠️  You are about to run this script on the **PRODUCTION** environment!"
    read -p "Are you sure you want to proceed? Type 'yes' to confirm: " CONFIRM
    if [ "$CONFIRM" != "yes" ]; then
      echo "❌ Operation aborted by the user."
      exit 1
    fi
  else
    echo "❌ .env.prd file not found!"
    exit 1
  fi
else
  echo "❌ Error: Invalid environment specified. Use 'local' or 'prd'."
  exit 1
fi

# psql接続用の変数定義
PSQL_CMD="psql -h $SUPABASE_DB_HOST -p $SUPABASE_DB_PORT -U $SUPABASE_DB_USER -d $SUPABASE_DB_NAME --set=sslmode=require"

# 環境変数が正しく設定されているか確認
if [ -z "$SUPABASE_DB_HOST" ] || [ -z "$SUPABASE_DB_PORT" ] || [ -z "$SUPABASE_DB_USER" ] || [ -z "$SUPABASE_DB_NAME" ] || [ -z "$SUPABASE_DB_PASSWORD" ]; then
  echo "❌ Error: One or more database connection variables are missing in the .env file."
  exit 1
fi

# パスワードを環境変数に設定
export PGPASSWORD=$SUPABASE_DB_PASSWORD

# SQLファイルを順番に実行
echo "Inserting test users..."
$PSQL_CMD -f $SQL_DIR/insert_test_users.sql

echo "Inserting test lesson types..."
$PSQL_CMD -f $SQL_DIR/insert_test_lesson_types.sql

echo "Inserting test lessons..."
$PSQL_CMD -f $SQL_DIR/insert_test_lessons.sql

echo "Inserting test reservations..."
$PSQL_CMD -f $SQL_DIR/insert_test_reservations.sql

echo "Inserting test notifications..."
$PSQL_CMD -f $SQL_DIR/insert_test_notifications.sql

echo "✅ All seeding operations completed successfully!"
