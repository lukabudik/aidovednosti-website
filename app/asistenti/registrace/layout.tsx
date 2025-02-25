import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: 'AI Institute - Registrace na pokročilý kurz',
  description: 'Registrace na pokročilý kurz AI Institute',
}

export default function AdvancedRegistrationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Toaster position="top-right" />
      <main className="grow">
        {children}
      </main>
    </>
  )
}
