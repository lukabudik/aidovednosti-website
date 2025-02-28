import Airtable from 'airtable'

interface CodeData {
  id: string;
  instituteEmail: string;
  instituteNumber: number;
  code: string;
  receivedAt: string;
  emailSubject: string;
  used?: boolean;
}

export async function getAllCodes(): Promise<CodeData[]> {
  // Ensure we have the required environment variables
  if (!process.env.NEXT_PUBLIC_AIRTABLE_PAT) {
    throw new Error('Airtable API token is missing. Please check your environment variables.')
  }
  
  if (!process.env.NEXT_PUBLIC_AIRTABLE_2FA_BASE_ID) {
    throw new Error('Airtable 2FA Base ID is missing. Please check your environment variables.')
  }

  const base = new Airtable({
    apiKey: process.env.NEXT_PUBLIC_AIRTABLE_PAT
  }).base(process.env.NEXT_PUBLIC_AIRTABLE_2FA_BASE_ID)

  try {
    const records = await base('Codes').select({
      sort: [{ field: 'ReceivedAt', direction: 'desc' }],
      maxRecords: 100
    }).firstPage()
    
    return records.map(record => ({
      id: record.id,
      instituteEmail: record.get('InstituteEmail') as string,
      instituteNumber: record.get('InstituteNumber') as number,
      code: record.get('Code') as string,
      receivedAt: record.get('ReceivedAt') as string,
      emailSubject: record.get('EmailSubject') as string,
      used: record.get('Used') as boolean
    }))
  } catch (error) {
    console.error('Error fetching all codes from Airtable:', error)
    throw new Error('Failed to fetch all codes from Airtable')
  }
}

export async function markCodeAsUsed(id: string): Promise<void> {
  // Ensure we have the required environment variables
  if (!process.env.NEXT_PUBLIC_AIRTABLE_PAT) {
    throw new Error('Airtable API token is missing. Please check your environment variables.')
  }
  
  if (!process.env.NEXT_PUBLIC_AIRTABLE_2FA_BASE_ID) {
    throw new Error('Airtable 2FA Base ID is missing. Please check your environment variables.')
  }

  const base = new Airtable({
    apiKey: process.env.NEXT_PUBLIC_AIRTABLE_PAT
  }).base(process.env.NEXT_PUBLIC_AIRTABLE_2FA_BASE_ID)

  try {
    await base('Codes').update(id, {
      Used: true
    })
  } catch (error) {
    console.error('Error marking code as used:', error)
    throw new Error('Failed to mark code as used')
  }
}
