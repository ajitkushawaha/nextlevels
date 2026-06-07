import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Visa from '@/models/Visa'

export async function GET() {
  try {
    await connectDB()
    const visas = await (Visa as any).find({}).lean()
    return NextResponse.json({ visas, count: visas.length }, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching visas:', error)
    return NextResponse.json({ error: error?.message || 'Failed to fetch visas' }, { status: 500 })
  }
}
