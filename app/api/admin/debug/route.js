import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'

export async function GET() {
  try {
    const client = await dbConnect()
    const db = client.db()
    
    const applications = await db.collection('applications').find({}).limit(5).toArray()
    
    return NextResponse.json({ 
      count: applications.length,
      sampleIds: applications.map(a => ({
        _id: a._id?.toString(),
        _idType: typeof a._id,
        name: a.name
      }))
    })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
