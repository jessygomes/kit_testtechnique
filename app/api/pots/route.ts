import prisma from "@/lib";
import { NextRequest } from "next/server";

//! Créer un pot
export const POST = async (req: NextRequest) => {
  try {
    const { namePot, color, imageUrl } = await req.json();
    console.log(namePot, color, imageUrl);

    if (!namePot || !color) {
      return new Response(
        JSON.stringify({ message: "Veuillez remplir tous les champs" }),
        { status: 400 }
      );
    }

    // Création du pot
    const pot = await prisma.pot.create({
      data: {
        namePot,
        imageUrl,
      },
    });

    // Associer la couleur au pot
    const newPotColor = await prisma.potColor.create({
      data: {
        potId: pot.id,
        colorId: parseInt(color, 10),
      },
    });

    // Construction de l'objet à renvoyer
    const newPot = {
      pot: {
        id: pot.id,
        namePot: pot.namePot,
        imageUrl: pot.imageUrl,
      },
      color: {
        id: color.id,
        nameColor: color.nameColor,
      },
    };

    // Retourner l'objet de réponse
    return new Response(JSON.stringify(pot), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Erreur lors de la création du pot" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

//! Récupérer tous les pots et leurs couleurs
export const GET = async (req: NextRequest) => {
  try {
    const pots = await prisma.pot.findMany({
      include: {
        potColors: {
          include: {
            color: true, // Inclure les détails de la couleur
          },
        },
      },
    });

    const potsWithColorNames = pots.map((pot) => ({
      ...pot,
      potColors: pot.potColors.map((potColor) => ({
        ...potColor,
        colorName: potColor.color.nameColor,
      })),
    }));

    return new Response(JSON.stringify(potsWithColorNames), {
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
