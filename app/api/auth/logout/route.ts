import prisma from "@/lib";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();

    if (!email) {
      return new NextResponse(JSON.stringify({ message: "Email not found" }), {
        status: 400,
      });
    }

    // Vérification de l'email
    const foundUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (foundUser) {
      // Mise à jour du champ isLogged à false
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          is_logged: false,
        },
      });

      console.log("User logout", foundUser);

      return new Response(JSON.stringify(foundUser), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};
