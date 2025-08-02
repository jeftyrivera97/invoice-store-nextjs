import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.users.findMany();

    // Convierte todos los BigInt a string
    const usersSafe = users.map(user => ({
      ...user,
      id: user.id.toString(),
      // Si tienes más campos BigInt, conviértelos aquí también
    }));

    return NextResponse.json(
      { data: usersSafe },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error al obtener los usuarios' },
      { status: 500 }
    );
  }
}