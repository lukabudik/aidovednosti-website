import '@/app/css/style.css'
import AdminNavbar from '@/components/admin-navbar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <AdminNavbar />
      <main className="grow">
        {children}
      </main>
    </div>
  )
}
