// ** Import Next
import { NextRequest, NextResponse } from "next/server"

// ** Import Mongoose
import connectMongoDB from "@/services/mongoose"

// ** Import Model
import Url from "@/models/url"

export const POST = async (request: NextRequest) => {
  try {
    await connectMongoDB()
    const body = await request.json()
    const newUrl = new Url(body)
    await newUrl.save()
    return NextResponse.json({ message: "success" })
  }
  catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}

export const GET = async (request: NextRequest) => {
  try {
    await connectMongoDB()
    const { searchParams } = new URL(request.url)
    const result = await Url.findOne({ shorten: searchParams.get("shorten") }).exec()
    return NextResponse.json({ origin: result.origin })
  }
  catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}