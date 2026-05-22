import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Enquiry from '@/models/Enquiry'

export async function POST(request: Request) {
  try {
    await connectDB()
    const body = await request.json()
    
    const { fullName, email, phone, educationLevel, preferredCountry, intakeYear } = body
    
    // Core field validation
    if (!fullName || !email || !phone || !educationLevel || !preferredCountry || !intakeYear) {
      return NextResponse.json(
        { error: 'Missing required profile assessment details.' },
        { status: 400 }
      )
    }
    
    const newEnquiry = await Enquiry.create({
      fullName,
      email,
      phone,
      educationLevel,
      fieldOfStudy: body.fieldOfStudy || '',
      preferredCountry,
      intakeYear,
      intakeMonth: body.intakeMonth || '',
      message: body.message || '',
      status: 'new'
    })
    
    return NextResponse.json(
      { success: true, message: 'Enquiry registered successfully', data: newEnquiry },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating student registration enquiry:', error)
    return NextResponse.json(
      { error: error.message || 'Internal Server Error occurred while saving enquiry.' },
      { status: 500 }
    )
  }
}
