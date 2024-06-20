import prisma from "@/lib";
import { NextRequest, NextResponse } from "next/server";

//! Modifier une plante
export const PUT = async (req: NextRequest) => {
  try {
    const { id, namePlante, description, imageUrl } = await req.json();

    if (!namePlante || !description) {
      return new NextResponse(
        JSON.stringify({ message: "Veuillez remplir tous les champs" }),
        { status: 400 }
      );
    }

    // Mise à jour de la plante
    const plant = await prisma.plante.update({
      where: {
        id: Number(id),
      },
      data: {
        namePlante,
        description,
        imageUrl,
      },
    });

    console.log("Plante updated", plant);

    return new NextResponse(JSON.stringify(plant), {
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

    // Suppression de la plante
    const plant = await prisma.plante.delete({
      where: {
        id: Number(id),
      },
    });

    return new NextResponse(JSON.stringify(plant), {
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
