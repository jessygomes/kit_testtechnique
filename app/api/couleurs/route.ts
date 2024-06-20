import prisma from "@/lib";
import { NextRequest } from "next/server";

//! Récupérer tous les pots et leurs couleurs
export const GET = async (req: NextRequest) => {
  try {
    const couleurs = await prisma.color.findMany();

    return new Response(JSON.stringify(couleurs), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Erreur lors de la récupération des pots" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

//! Ajouter une nouvelle couleur
export const POST = async (req: NextRequest) => {
  try {
    const { couleur } = await req.json();

    const newColor = await prisma.color.create({
      data: {
        nameColor: couleur,
      },
    });

    return new Response(JSON.stringify(newColor), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Erreur lors de l'ajout de la couleur" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
