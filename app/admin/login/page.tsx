import { Metadata } from 'next';
import { Suspense } from 'react';
import LoginForm from '@/components/login-form';

export const metadata: Metadata = {
  title: 'Přihlášení | AI Dovednosti',
  description: 'Přihlášení do administrace',
};

// Make this page dynamic to avoid static generation issues
export const dynamic = 'force-dynamic';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center mb-8">
        <img 
          src="/images/logo.png" 
          alt="AI Dovednosti Logo" 
          className="h-12 mb-4"
        />
        <h1 className="text-3xl font-bold text-gray-900">
          Administrace 2FA kódů
        </h1>
      </div>
      
      <Suspense fallback={<div className="text-center p-4">Načítání...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
