import prisma from '../../../../lib/prisma'
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const users = await prisma.users.findMany();
    return NextResponse.json(users)
  } catch (error) {
    console.error(error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}