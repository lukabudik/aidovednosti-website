import Airtable from 'airtable'

interface RegistrationData {
  Name: string
  Email: string
  Phone: string
  ReferralCodeWritten?: string
  ReferralCodeCookies?: string
  Course: string | 'Zatím nevybrán'
  GDPRConsent: boolean
  Status: string
}

export async function submitRegistration(data: RegistrationData) {
  // Ensure we have the required environment variables
  if (!process.env.NEXT_PUBLIC_AIRTABLE_PAT) {
    throw new Error('Airtable API token is missing. Please check your environment variables.')
  }
  
  if (!process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID) {
    throw new Error('Airtable Base ID is missing. Please check your environment variables.')
  }

  const base = new Airtable({
    apiKey: process.env.NEXT_PUBLIC_AIRTABLE_PAT
  }).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID)

  try {
    console.log('Submitting registration data:', data)
    
    const result = await base('Registrations').create(
      [
        {
          fields: {
            Name: data.Name,
            Email: data.Email,
            Phone: data.Phone,
            ReferralCodeWritten: data.ReferralCodeWritten || '',
            ReferralCodeCookies: data.ReferralCodeCookies || '',
            Course: data.Course,
            GDPRConsent: true, // Always true as per requirements
            Status: 'Nepřihlášen' // Default status
          }
        }
      ],
      { typecast: true }
    )

    console.log('Airtable response:', result)
    return result
  } catch (error: any) {
    console.error('Detailed Airtable error:', {
      message: error.message,
      error: error,
      data: data
    })
    
    // Throw a more specific error message
    throw new Error(
      error.message || 'Failed to submit registration to Airtable'
    )
  }
}
