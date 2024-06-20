import prisma from "@/lib";
import { NextRequest, NextResponse } from "next/server";

//! Modifier un pot
export const PUT = async (req: NextRequest) => {
  try {
    const { id, namePot, color, imageUrl } = await req.json();

    if (!namePot || !color) {
      return new NextResponse(
        JSON.stringify({ message: "Veuillez remplir tous les champs" }),
        { status: 400 }
      );
    }

    // Mise à jour du pot
    const pot = await prisma.pot.update({
      where: {
        id: Number(id),
      },
      data: {
        namePot,
        imageUrl,
      },
    });

    let potColor = await prisma.potColor.findFirst({
      where: {
        potId: pot.id,
      },
    });

    // Si la couleur a changé, mettre à jour l'association
    if (color && potColor?.colorId !== parseInt(color, 10)) {
      potColor = await prisma.potColor.update({
        where: {
          // Utilisez la clé composite attendue ici
          potId_colorId: {
            potId: pot.id,
            colorId: potColor?.colorId ?? 0, // Utilisez l'ancien colorId pour identifier l'entrée
          },
        },
        data: {
          colorId: parseInt(color, 10),
        },
      });
    } else if (!potColor) {
      // Si aucune association n'existe, en créer une nouvelle
      potColor = await prisma.potColor.create({
        data: {
          potId: pot.id,
          colorId: parseInt(color, 10),
        },
      });
    }

    // Construction de l'objet à renvoyer
    const updatedPot = {
      pot: {
        id: pot.id,
        namePot: pot.namePot,
        imageUrl: pot.imageUrl,
      },
      color: {
        id: potColor?.colorId,
        nameColor: color.nameColor,
      },
    };

    // Retourner l'objet de réponse
    return new NextResponse(JSON.stringify(updatedPot), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch {
    return new NextResponse(
      JSON.stringify({ message: "Erreur lors de la modification du pot" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

//! Supprimer un pot
export const DELETE = async (req: NextRequest) => {
  try {
    const { id } = await req.json();

    // Supprimer l'association de couleur du pot
    await prisma.potColor.deleteMany({
      where: {
        potId: Number(id),
      },
    });

    // Suppression du pot
    const pot = await prisma.pot.delete({
      where: {
        id: Number(id),
      },
    });

    return new NextResponse(JSON.stringify(pot), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch {
    return new NextResponse(
      JSON.stringify({ message: "Erreur lors de la suppression du pot" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
