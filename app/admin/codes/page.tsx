import { Metadata } from 'next';
import AdminCodesClient from '@/components/admin-codes-client';

export const metadata: Metadata = {
  title: 'ChatGPT 2FA Kódy | AI Dovednosti',
  description: 'Sledování a zobrazování ChatGPT 2FA verifikačních kódů pro kurzy',
};

export default function AdminCodesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <AdminCodesClient />
      </div>
    </div>
  );
}
