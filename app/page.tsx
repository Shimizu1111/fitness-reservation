import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-8">
            <Dumbbell className="h-16 w-16 text-sky-500" />
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-800">
            フィットネス予約管理システム
          </h1>
          <p className="mb-8 text-xl text-gray-600">
            簡単な操作で、レッスンの予約・管理ができます
          </p>
          
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="bg-white hover:shadow-lg transition-shadow border border-gray-100">
              <CardHeader>
                <CardTitle className="text-gray-800">会員の方</CardTitle>
                <CardDescription className="text-gray-600">レッスンの予約・管理</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-sky-500 hover:bg-sky-600" asChild>
                  <Link href="/customer">ログイン</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-shadow border border-gray-100">
              <CardHeader>
                <CardTitle className="text-gray-800">オーナー</CardTitle>
                <CardDescription className="text-gray-600">予約状況・会員管理</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-sky-500 hover:bg-sky-600" asChild>
                  <Link href="/owner">ログイン</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-shadow border border-gray-100">
              <CardHeader>
                <CardTitle className="text-gray-800">トレーナー</CardTitle>
                <CardDescription className="text-gray-600">レッスン・参加者確認</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-sky-500 hover:bg-sky-600" asChild>
                  <Link href="/trainer">ログイン</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
