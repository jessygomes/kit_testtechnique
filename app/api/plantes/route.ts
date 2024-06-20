import prisma from "@/lib";
import { NextRequest, NextResponse } from "next/server";

//! Créer une plante
export const POST = async (req: NextRequest) => {
  try {
    const { namePlante, description, imageUrl } = await req.json();
    console.log(namePlante, description, imageUrl);

    if (!namePlante || !description) {
      return new Response(
        JSON.stringify({ message: "Veuillez remplir tous les champs" }),
        { status: 400 }
      );
    }

    // Création de la plante
    const plant = await prisma.plante.create({
      data: {
        namePlante,
        description,
        imageUrl,
      },
    });

    console.log("Plante created", plant);

    return new Response(JSON.stringify(plant), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: "Erreur lors de la création d'une plante" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

//! Récupérer toutes les plantes
export const GET = async (req: NextRequest) => {
  try {
    const plantes = await prisma.plante.findMany();
    return new Response(JSON.stringify(plantes), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: "Erreur lors de la récupération des plantes" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
