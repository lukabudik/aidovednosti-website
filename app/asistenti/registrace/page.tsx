import dynamic from 'next/dynamic'

// Import the client-side only component
const AdvancedRegistrationPageClient = dynamic(
  () => import('@/components/advanced-registration-page-client'),
  { ssr: false } // This ensures the component only renders on the client
)

export default function AdvancedRegistrationPage() {
  return <AdvancedRegistrationPageClient />
}
