'use client';

import { OwnerNav } from '../../../features/owner/components/owner-nav';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  TrendingUp,
  Users,
  Calendar,
  Clock,
  ArrowUp,
  ArrowDown,
  ChevronDown,
} from 'lucide-react';
import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

interface AnalyticsData {
  currentStats: {
    totalCustomers: number;
    activeCustomers: number;
    totalLessons: number;
    averageAttendance: number;
  };
  trends: {
    customers: Array<{
      date: string;
      total: number;
      active: number;
    }>;
    lessons: Array<{
      date: string;
      count: number;
      attendance: number;
    }>;
    timeSlots: Array<{
      time: string;
      counts: number[];
      dates: string[];
    }>;
  };
  lessonTypeStats: Array<{
    type: string;
    monthly: number[];
    dates: string[];
  }>;
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // 仮の分析データ
  const [analytics] = useState<AnalyticsData>({
    currentStats: {
      totalCustomers: 150,
      activeCustomers: 120,
      totalLessons: 450,
      averageAttendance: 85,
    },
    trends: {
      customers: [
        { date: '2023-12', total: 130, active: 100 },
        { date: '2024-01', total: 150, active: 120 },
      ],
      lessons: [
        { date: '2023-12', count: 200, attendance: 82 },
        { date: '2024-01', count: 250, attendance: 85 },
      ],
      timeSlots: [
        {
          time: '10:00',
          counts: [40, 45, 42, 48],
          dates: ['2023-12-01', '2023-12-08', '2023-12-15', '2023-12-22'],
        },
        {
          time: '18:00',
          counts: [35, 38, 40, 42],
          dates: ['2023-12-01', '2023-12-08', '2023-12-15', '2023-12-22'],
        },
        {
          time: '19:00',
          counts: [30, 32, 35, 38],
          dates: ['2023-12-01', '2023-12-08', '2023-12-15', '2023-12-22'],
        },
      ],
    },
    lessonTypeStats: [
      {
        type: 'ヨガ',
        monthly: [80, 85, 90, 95],
        dates: ['2023-12', '2024-01', '2024-02', '2024-03'],
      },
      {
        type: 'ピラティス',
        monthly: [60, 65, 70, 75],
        dates: ['2023-12', '2024-01', '2024-02', '2024-03'],
      },
      {
        type: '筋力トレーニング',
        monthly: [40, 45, 50, 55],
        dates: ['2023-12', '2024-01', '2024-02', '2024-03'],
      },
    ],
  });

  // 前月比の計算
  const calculateGrowth = (current: number, previous: number) => {
    const growth = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(growth).toFixed(1),
      isPositive: growth > 0,
    };
  };

  // 会員数の成長率
  const customerGrowth = calculateGrowth(
    analytics.trends.customers[1].total,
    analytics.trends.customers[0].total
  );

  // レッスン数の成長率
  const lessonGrowth = calculateGrowth(
    analytics.trends.lessons[1].count,
    analytics.trends.lessons[0].count
  );

  // 時間帯ごとの予約数推移データの作成
  const timeSlotChartData = analytics.trends.timeSlots[0].dates.map(
    (date, index) => {
      const data: any = { date };
      analytics.trends.timeSlots.forEach((slot) => {
        data[slot.time] = slot.counts[index];
      });
      return data;
    }
  );

  // レッスン種類別推移データの作成
  const lessonTypeChartData = analytics.lessonTypeStats[0].dates.map(
    (date, index) => {
      const data: any = { date };
      analytics.lessonTypeStats.forEach((lesson) => {
        data[lesson.type] = lesson.monthly[index];
      });
      return data;
    }
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <OwnerNav />
      <main className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">分析</h1>
          <div className="flex gap-2">
            <Button
              variant={period === 'week' ? 'default' : 'outline'}
              onClick={() => setPeriod('week')}
            >
              週間
            </Button>
            <Button
              variant={period === 'month' ? 'default' : 'outline'}
              onClick={() => setPeriod('month')}
            >
              月間
            </Button>
            <Button
              variant={period === 'year' ? 'default' : 'outline'}
              onClick={() => setPeriod('year')}
            >
              年間
            </Button>
          </div>
        </div>

        {/* 概要カード */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="relative">
            <Card
              className="p-6 cursor-pointer"
              onClick={() =>
                setExpandedCard(
                  expandedCard === 'customers' ? null : 'customers'
                )
              }
            >
              <div className="flex items-center gap-4">
                <Users className="h-8 w-8 text-sky-500" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-gray-500">
                      総会員数
                    </h2>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        expandedCard === 'customers' ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-gray-800">
                      {analytics.currentStats.totalCustomers}名
                    </p>
                    <div
                      className={`flex items-center text-sm ${
                        customerGrowth.isPositive
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      {customerGrowth.isPositive ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      )}
                      {customerGrowth.value}%
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    アクティブ: {analytics.currentStats.activeCustomers}名
                  </p>
                </div>
              </div>
            </Card>
            {expandedCard === 'customers' && (
              <Card className="absolute top-full left-0 right-0 mt-2 p-6 z-10">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analytics.trends.customers}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="total"
                        name="総会員数"
                        stroke="#0ea5e9"
                      />
                      <Line
                        type="monotone"
                        dataKey="active"
                        name="アクティブ会員"
                        stroke="#22c55e"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            )}
          </div>

          <div className="relative">
            <Card
              className="p-6 cursor-pointer"
              onClick={() =>
                setExpandedCard(expandedCard === 'lessons' ? null : 'lessons')
              }
            >
              <div className="flex items-center gap-4">
                <Calendar className="h-8 w-8 text-sky-500" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-gray-500">
                      月間レッスン数
                    </h2>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        expandedCard === 'lessons' ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-gray-800">
                      {analytics.currentStats.totalLessons}回
                    </p>
                    <div
                      className={`flex items-center text-sm ${
                        lessonGrowth.isPositive
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      {lessonGrowth.isPositive ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      )}
                      {lessonGrowth.value}%
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            {expandedCard === 'lessons' && (
              <Card className="absolute top-full left-0 right-0 mt-2 p-6 z-10">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analytics.trends.lessons}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="count"
                        name="レッスン数"
                        stroke="#0ea5e9"
                      />
                      <Line
                        type="monotone"
                        dataKey="attendance"
                        name="出席率"
                        stroke="#eab308"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            )}
          </div>

          <div className="relative">
            <Card
              className="p-6 cursor-pointer"
              onClick={() =>
                setExpandedCard(
                  expandedCard === 'attendance' ? null : 'attendance'
                )
              }
            >
              <div className="flex items-center gap-4">
                <TrendingUp className="h-8 w-8 text-sky-500" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-gray-500">
                      平均出席率
                    </h2>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        expandedCard === 'attendance' ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {analytics.currentStats.averageAttendance}%
                  </p>
                  <p className="text-sm text-gray-500">
                    前月比:{' '}
                    {analytics.trends.lessons[1].attendance -
                      analytics.trends.lessons[0].attendance}
                    %
                  </p>
                </div>
              </div>
            </Card>
            {expandedCard === 'attendance' && (
              <Card className="absolute top-full left-0 right-0 mt-2 p-6 z-10">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analytics.trends.lessons}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="attendance"
                        name="出席率"
                        stroke="#0ea5e9"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            )}
          </div>

          <div className="relative">
            <Card
              className="p-6 cursor-pointer"
              onClick={() =>
                setExpandedCard(
                  expandedCard === 'timeSlots' ? null : 'timeSlots'
                )
              }
            >
              <div className="flex items-center gap-4">
                <Clock className="h-8 w-8 text-sky-500" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-gray-500">
                      人気の時間帯推移
                    </h2>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        expandedCard === 'timeSlots' ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  <div className="space-y-2 mt-2">
                    {analytics.trends.timeSlots.map((slot, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 w-12">
                          {slot.time}
                        </span>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-sky-500 rounded-full"
                            style={{
                              width: `${
                                (slot.counts[slot.counts.length - 1] / 50) * 100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
            {expandedCard === 'timeSlots' && (
              <Card className="absolute top-full left-0 right-0 mt-2 p-6 z-10">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={timeSlotChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {analytics.trends.timeSlots.map((slot, index) => (
                        <Line
                          key={index}
                          type="monotone"
                          dataKey={slot.time}
                          name={`${slot.time}`}
                          stroke={`hsl(${index * 120}, 70%, 50%)`}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* 詳細分析 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* レッスン種類別推移 */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              レッスン種類別推移
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={lessonTypeChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {analytics.lessonTypeStats.map((lesson, index) => (
                    <Bar
                      key={index}
                      dataKey={lesson.type}
                      fill={`hsl(${index * 120}, 70%, 50%)`}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* 会員数・出席率推移 */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              会員数・出席率推移
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.trends.customers}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    domain={[0, 100]}
                  />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="total"
                    name="総会員数"
                    stroke="#0ea5e9"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="active"
                    name="アクティブ会員"
                    stroke="#22c55e"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
