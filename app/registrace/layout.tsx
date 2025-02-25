import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: 'AI Institute - Registrace na kurz',
  description: 'Registrace na kurz AI Institute',
}

export default function RegistrationLayout({
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
