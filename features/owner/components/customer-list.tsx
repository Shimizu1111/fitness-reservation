import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCustomers, updateCustomerStatus } from '../data/customer';
import type { CustomerFilters } from '../types/customer';
import { statusActions } from '../constants/customer';
import { Database } from '@/lib/supabase/supabaseTypes';

type Customers =
  Database['public']['Functions']['get_customers_for_owner']['Returns'];

export function CustomerList() {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customers>([]);
  const [filters, setFilters] = useState<CustomerFilters>({
    searchQuery: '',
    statusFilter: 'all',
    sortField: 'name',
    sortOrder: 'asc',
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data, error } = await getCustomers();
      if (error) {
        console.error('会員データの取得に失敗しました:', error);
      } else if (data) {
        setCustomers(data);
      }
    };

    fetchCustomers();
  }, []);

  // 詳細画面への遷移
  const handleViewDetails = (customerId: string) => {
    router.push(`/owner/customers/${customerId}`);
  };

  // ステータス変更の処理
  const handleStatusChange = async (
    customerId: string,
    newStatus: Customers[number]['customer_status']
  ) => {
    try {
      const { error } = await updateCustomerStatus(customerId, newStatus);
      if (error) throw error;

      // 成功したら会員一覧を再取得
      const { data } = await getCustomers();
      if (data) setCustomers(data);
    } catch (error) {
      console.error('ステータスの更新に失敗しました:', error);
    }
  };

  // フィルタリングとソート
  const filteredAndSortedCustomers = customers
    .filter(
      customer =>
        (filters.statusFilter === 'all' ||
          customer.customer_status === filters.statusFilter) &&
        (customer.name.includes(filters.searchQuery) ||
          customer.email.includes(filters.searchQuery))
      //  customer.phone.includes(filters.searchQuery))
    )
    .sort((a, b) => {
      const aValue = a[filters.sortField];
      const bValue = b[filters.sortField];
      const order = filters.sortOrder === 'asc' ? 1 : -1;

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return (aValue - bValue) * order;
      }
      return String(aValue).localeCompare(String(bValue)) * order;
    });

  // ソートの切り替え
  const toggleSort = (field: keyof Customers[number]) => {
    setFilters(prev => ({
      ...prev,
      sortField: field,
      sortOrder:
        prev.sortField === field && prev.sortOrder === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="会員を検索..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-md w-64"
              value={filters.searchQuery}
              onChange={e =>
                setFilters(prev => ({ ...prev, searchQuery: e.target.value }))
              }
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-200 rounded-md bg-white"
            value={filters.statusFilter}
            onChange={e =>
              setFilters(prev => ({
                ...prev,
                statusFilter: e.target.value as
                  | 'all'
                  | Database['public']['Enums']['customer_status'],
              }))
            }
          >
            <option value="all">すべてのステータス</option>
            <option value="アクティブ">アクティブ</option>
            <option value="休会">休会</option>
            <option value="退会">退会</option>
          </select>
        </div>
        <Button
          className="bg-sky-500 hover:bg-sky-600"
          onClick={() => router.push('/owner/customers/create')}
        >
          新規会員登録
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => toggleSort('name')}
                >
                  会員名{' '}
                  {filters.sortField === 'name' &&
                    (filters.sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => toggleSort('email')}
                >
                  メールアドレス{' '}
                  {filters.sortField === 'email' &&
                    (filters.sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  電話番号
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => toggleSort('join_date')}
                >
                  入会日{' '}
                  {filters.sortField === 'join_date' &&
                    (filters.sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => toggleSort('reservation_count')}
                >
                  受講回数{' '}
                  {filters.sortField === 'reservation_count' &&
                    (filters.sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => toggleSort('latest_reserved_at')}
                >
                  最終受講日{' '}
                  {filters.sortField === 'latest_reserved_at' &&
                    (filters.sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => toggleSort('customer_status')}
                >
                  ステータス{' '}
                  {filters.sortField === 'customer_status' &&
                    (filters.sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedCustomers.map(customer => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {customer.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {customer.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {customer.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {customer.join_date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {customer.reservation_count}回
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {customer.latest_reserved_at || '未受講'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        // customer.customer_status === CustomerStatus.ACTIVE
                        customer.customer_status === 'アクティブ'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {customer.customer_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button
                      variant="ghost"
                      className="text-sky-600 hover:text-sky-900"
                      onClick={() => handleViewDetails(customer.id)}
                    >
                      詳細
                    </Button>
                    {statusActions[customer.customer_status]?.map(
                      ({ label, nextStatus }) => (
                        <Button
                          key={nextStatus}
                          variant="ghost"
                          className="text-red-600 hover:text-red-900 ml-2"
                          onClick={() =>
                            handleStatusChange(customer.id, nextStatus)
                          }
                        >
                          {label}
                        </Button>
                      )
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
