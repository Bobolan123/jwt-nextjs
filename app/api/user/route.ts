import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

export async function GET() {
    const res = await fetch('http://localhost:3001/api/user')
    const data = await res.json()
   
    return Response.json({ data })
  }

  export async function POST(req:any,res:NextApiResponse){
    const data  = await req.json()
    await fetch('http://localhost:3001/api/user', {method:'POST', body: data})

    return NextResponse.json(data)
}