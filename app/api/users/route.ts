import prisma from "@/lib";
import { NextRequest, NextResponse } from "next/server";

//! Récupérer tous les users
export const GET = async (req: NextRequest) => {
  try {
    const users = await prisma.user.findMany();
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        message: "Erreur lors de la récupération des utilisateurs",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
