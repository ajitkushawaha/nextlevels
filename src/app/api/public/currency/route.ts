import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import CompanySettings from '@/models/CompanySettings'

export async function GET() {
  try {
    await connectDB()
    const settings = await (CompanySettings as any).findOne({}).lean()
    const currency = settings?.defaultCurrency || 'INR'
    return NextResponse.json({ success: true, currency }, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching currency:', error)
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch currency' },
      { status: 500 }
    )
  }
}
