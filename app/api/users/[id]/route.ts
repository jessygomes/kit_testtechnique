import prisma from "@/lib";
import { NextRequest, NextResponse } from "next/server";

//! Modifier un User
export const PUT = async (req: NextRequest) => {
  try {
    const { id, nom, prenom, email, role } = await req.json();

    if (!nom || !prenom || !email) {
      return new NextResponse(
        JSON.stringify({ message: "Veuillez remplir tous les champs" }),
        { status: 400 }
      );
    }

    // Mise à jour de la plante
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        nom,
        prenom,
        email,
        role,
      },
    });

    console.log("Plante updated", user);

    return new NextResponse(JSON.stringify(user), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        message: "Erreur lors de la modification de la plante",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

//! Supprimer une plante
export const DELETE = async (req: NextRequest) => {
  try {
    const { id } = await req.json();

    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    return new NextResponse(JSON.stringify(user), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        message: "Erreur lors de la suppression de la plante",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
