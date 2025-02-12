'use client';

import { CustomerNav } from '../components/customer-nav';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Bell, Mail } from 'lucide-react';
import { useState } from 'react';

// 通知設定の型定義
interface NotificationSettings {
  email: boolean;
  notifications: {
    reservation: boolean;
    cancellation: boolean;
    waitingList: boolean;
  };
}

export default function SettingsPage() {
  // 通知設定の状態管理
  const [settings, setSettings] = useState<NotificationSettings>({
    email: true,
    notifications: {
      reservation: true,
      cancellation: true,
      waitingList: true,
    },
  });

  // 設定を保存する関数
  const saveSettings = async () => {
    try {
      // TODO: APIを呼び出して設定を保存
      console.log('Settings saved:', settings);
      // 成功時の処理を追加予定
    } catch (error) {
      // エラー時の処理を追加予定
      console.error('Failed to save settings:', error);
    }
  };

  // 通知設定を更新する関数
  const updateNotificationSetting = (
    key: keyof NotificationSettings['notifications'],
    value: boolean
  ) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerNav />
      <main className="container mx-auto p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">設定</h1>

          {/* 通知チャネル設定 */}
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Mail className="h-5 w-5 text-gray-600" />
              通知チャネル
            </h2>
            <div className="flex items-center justify-between py-3">
              <div>
                <div className="font-medium text-gray-800">メール通知</div>
                <div className="text-sm text-gray-500">
                  予約関連の通知をメールで受け取ります
                </div>
              </div>
              <Switch
                checked={settings.email}
                onCheckedChange={(checked: boolean) =>
                  setSettings(prev => ({ ...prev, email: checked }))
                }
              />
            </div>
          </Card>

          {/* 通知設定 */}
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Bell className="h-5 w-5 text-gray-600" />
              通知設定
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <div className="font-medium text-gray-800">予約確定通知</div>
                  <div className="text-sm text-gray-500">
                    レッスンの予約が確定した際に通知を受け取ります
                  </div>
                </div>
                <Switch
                  checked={settings.notifications.reservation}
                  onCheckedChange={(checked: boolean) =>
                    updateNotificationSetting('reservation', checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <div className="font-medium text-gray-800">
                    キャンセル通知
                  </div>
                  <div className="text-sm text-gray-500">
                    予約がキャンセルされた際に通知を受け取ります
                  </div>
                </div>
                <Switch
                  checked={settings.notifications.cancellation}
                  onCheckedChange={(checked: boolean) =>
                    updateNotificationSetting('cancellation', checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="font-medium text-gray-800">
                    キャンセル待ち通知
                  </div>
                  <div className="text-sm text-gray-500">
                    キャンセル待ちの順番が回ってきた際に通知を受け取ります
                  </div>
                </div>
                <Switch
                  checked={settings.notifications.waitingList}
                  onCheckedChange={(checked: boolean) =>
                    updateNotificationSetting('waitingList', checked)
                  }
                />
              </div>
            </div>
          </Card>

          {/* 保存ボタン */}
          <div className="flex justify-end">
            <Button
              className="bg-sky-500 hover:bg-sky-600"
              onClick={saveSettings}
            >
              設定を保存
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
