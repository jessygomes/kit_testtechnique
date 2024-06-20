import prisma from "@/lib";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

//! INSCRIPTION
export const POST = async (req: NextRequest) => {
  try {
    const { nom, prenom, email, password, role } = await req.json();

    if (!nom || !prenom || !email || !password) {
      return new NextResponse(
        JSON.stringify({ message: "Veuillez remplir tous les champs" }),
        { status: 400 }
      );
    }

    // Vérification de l'email : si l'email existe déjà dans la base de données
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ message: "Cet email est déjà utilisé" }),
        { status: 400 }
      );
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const user = await prisma.user.create({
      data: {
        nom,
        prenom,
        email,
        password: hashedPassword,
        role: role || "user",
      },
    });

    console.log("User created", user);

    const userToStore = {
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      is_logged: true,
      id: user.id,
      role: user.role,
    };

    return new Response(JSON.stringify(userToStore), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};
