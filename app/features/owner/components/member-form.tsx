import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createMember } from '../data/member';
import type { MemberFormData } from '../data/types';
import { generateSecurePassword } from '@/lib/utils/password';
import { toast } from '@/hooks/use-toast';

export function MemberForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<MemberFormData>({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // セキュアなパスワードを生成
      const password = generateSecurePassword();

      const { data, error } = await createMember({
        ...formData,
        password,
      });

      if (error) throw error;

      toast({
        title: '会員登録が完了しました',
        description: (
          <>
            仮パスワード: {password}
            <br />
            このパスワードを会員に通知してください。
          </>
        ),
      });

      router.push('/owner/members');
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'エラーが発生しました',
        description: error instanceof Error ? error.message : '会員登録に失敗しました',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">氏名</Label>
        <Input
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">メールアドレス</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">電話番号</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="flex gap-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-sky-500 hover:bg-sky-600"
        >
          {isLoading ? '登録中...' : '登録する'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          キャンセル
        </Button>
      </div>
    </form>
  );
} 