export async function GET() {
    const res = await fetch('http://localhost:3001/api/user')
    const data = await res.json()
   
    return Response.json({ data })
  }