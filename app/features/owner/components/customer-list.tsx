import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCustomers, updateCustomerStatus } from '../data/customer';
import type { Customer, CustomerFilters } from '../types/customer';
import { getCustomerStatusString, CustomerStatus } from '../constants/customer';

export function CustomerList() {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
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
  const handleStatusChange = async (customerId: string, newStatus: 'active' | 'inactive') => {
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
    .filter(customer =>
      (filters.statusFilter === 'all' || customer.status === filters.statusFilter) &&
      (customer.name.includes(filters.searchQuery) ||
       customer.email.includes(filters.searchQuery) ||
       customer.phone.includes(filters.searchQuery))
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
  const toggleSort = (field: keyof Customer) => {
    setFilters(prev => ({
      ...prev,
      sortField: field,
      sortOrder: prev.sortField === field && prev.sortOrder === 'asc' ? 'desc' : 'asc',
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
              onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-200 rounded-md bg-white"
            value={filters.statusFilter}
            onChange={(e) => setFilters(prev => ({ 
              ...prev, 
              statusFilter: e.target.value as 'all' | 'active' | 'inactive' 
            }))}
          >
            <option value="all">すべてのステータス</option>
            <option value="active">アクティブ</option>
            <option value="inactive">非アクティブ</option>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleSort('name')}>
                  会員名 {filters.sortField === 'name' && (filters.sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleSort('email')}>
                  メールアドレス {filters.sortField === 'email' && (filters.sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  電話番号
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleSort('joinDate')}>
                  入会日 {filters.sortField === 'joinDate' && (filters.sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleSort('totalLessons')}>
                  受講回数 {filters.sortField === 'totalLessons' && (filters.sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleSort('lastLesson')}>
                  最終受講日 {filters.sortField === 'lastLesson' && (filters.sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleSort('status')}>
                  ステータス {filters.sortField === 'status' && (filters.sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{customer.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {customer.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {customer.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {customer.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {customer.totalLessons}回
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {customer.lastLesson || '未受講'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      customer.status === CustomerStatus.ACTIVE
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {getCustomerStatusString(customer.status)}
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
                    <Button 
                      variant="ghost" 
                      className="text-red-600 hover:text-red-900 ml-2"
                      onClick={() => handleStatusChange(
                        customer.id,
                        customer.status === CustomerStatus.ACTIVE ? 'inactive' : 'active'
                      )}
                    >
                      {customer.status === CustomerStatus.ACTIVE ? '利用停止' : '再開'}
                    </Button>
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