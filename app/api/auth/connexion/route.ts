import prisma from "@/lib";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new NextResponse(
        JSON.stringify({ message: "Veuillez remplir tous les champs" }),
        { status: 400 }
      );
    }

    // Vérification de l'email : si l'email existe déjà dans la base de données
    const foundUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // Vérification du mot de passe
    if (foundUser) {
      const match = await bcrypt.compare(password, foundUser.password);

      if (match) {
        // Mise à jour du champ isLogged à true
        await prisma.user.update({
          where: {
            email,
          },
          data: {
            is_logged: true,
          },
        });

        const userToStore = {
          nom: foundUser.nom,
          prenom: foundUser.prenom,
          email: foundUser.email,
          is_logged: true, // Supposant que vous voulez définir is_logged à true lors du stockage
          id: foundUser.id,
          role: foundUser.role,
        };

        console.log("User logged in", foundUser);

        return new Response(JSON.stringify(userToStore), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    } else {
      return new NextResponse(
        JSON.stringify({ message: "Email ou mot de passe incorrect" }),
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};
