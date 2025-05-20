import { NextRequest, NextResponse } from "next/server";
import type { Location } from "@/app/_types/Location";

type Params = {
  zipCode: string 
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
  const {zipCode} = params

  const url = `https://api.tomorrow.io/v4/weather/realtime?location=${zipCode}&units=imperial&apikey=${process.env.TOMORROW_API_KEY}`;
  
  try {
    const response = await fetch(url, {
      headers: {accept: 'application/json', 'accept-encoding': 'deflate, gzip, br'}
    })
    const data: Location = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, name: error.name })
    }

    return NextResponse.error()
  }
}
