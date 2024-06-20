"use client";
import { ModalSuppPot } from "@/components/ModalSuppPot";
import PotForm from "@/components/PotForm";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import React from "react";

export default function AdminPot() {
  const router = useRouter();

  //! Création d'un state pour stocker les plantes & pots venant de l'API
  const [pots, setPots] = useState<PotType[]>([]);

  //! Vérification : Admin ou User + FETCH des plantes depuis l'API
  useEffect(() => {
    const userAdmin = JSON.parse(localStorage.getItem("user") || "{}");
    const isAdmin = userAdmin?.role === "admin";

    if (!isAdmin) {
      router.push("/"); // Renvoie à l'accueil si l'utilisateur n'est pas un admin
    }

    const fetchPots = async () => {
      try {
        const response = await fetch("/api/pots");
        const data = await response.json();
        setPots(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des pots:", error);
      }
    };

    fetchPots();
  }, [router]);

  //! Pour mettre à jour le state des plantes avec une nouvelle plante ajoutée et l'afficher dynamiquement
  const ajouterPot = (nouveauPot: PotType) => {
    setPots((potsActuels) => {
      const index = potsActuels.findIndex((pot) => pot.id === nouveauPot.id);
      if (index >= 0) {
        const nouveauxPots = [...potsActuels];
        nouveauxPots[index] = nouveauPot;
        return nouveauxPots;
      } else {
        return [...potsActuels, nouveauPot];
      }
    });
  };
  const supprimerPot = (potId: string) => {
    setPots((potsActuels) => potsActuels.filter((pot) => pot.id !== potId));
  };

  //! Gestion des modales POTS : Création, Modification & Suppression
  // Gestion de la modale de création
  const [isModalPotCreateOpen, setIsModalPotCreateOpen] = useState(false);
  const openModalPotCreate = () => setIsModalPotCreateOpen(true);
  const closeModalPotCreate = () => setIsModalPotCreateOpen(false);

  // Gestion de la modale de modification
  const [isModalPotModifOpen, setIsModalPotModifOpen] = useState(false);
  const [selectedPotIdForModif, setSelectedPotIdForModif] = useState<
    string | null
  >(null);
  const openModalPotModif = (id: string) => {
    setSelectedPotIdForModif(id);
    setIsModalPotModifOpen(true);
  };
  const closeModalPotModif = () => {
    setSelectedPotIdForModif(null);
    setIsModalPotModifOpen(false);
  };

  // Gestion de la modale de suppression
  const [isModalPotSuppOpen, setIsModalPotSuppOpen] = useState(false);

  const openModalPotSupp = (id: string) => {
    setSelectedPotIdForModif(id);
    setIsModalPotSuppOpen(true);
  };
  const closeModalPotSupp = () => setIsModalPotSuppOpen(false);

  useEffect(() => {
    console.log("selectedPotIdForModif a changé:", selectedPotIdForModif);
  }, [selectedPotIdForModif]);

  const selectedPot = pots.find((pot) => pot.id === selectedPotIdForModif);

  return (
    <section className="wrapper flex flex-col gap-2 my-24 z-10 relative h-[100vh]">
      <div className="flex flex-row gap-2">
        <Link
          href="/admin/users"
          className="text-[0.8rem] lg:text-[1rem] text-center text-white font-bold tracking-widest uppercase p-2 bg-secondary rounded-lg hover:bg-primaryBlack transition-all duration-300 ease-in-out"
        >
          Voir les utilisateurs
        </Link>
        <Link
          href="/admin/plantes"
          className="text-[0.8rem] lg:text-[1rem] text-center text-white font-bold tracking-widest uppercase p-2 bg-secondary rounded-lg hover:bg-primaryBlack transition-all duration-300 ease-in-out"
        >
          Voir les plantes
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 justify-around">
        {/* POTS */}
        <div className="w-full flex flex-col gap-4 rounded-lg">
          <div className="flex justify-between items-center bg-primary rounded-lg text-white font-bold p-4">
            <h2>Nos Pots ({pots.length})</h2>
            <button
              onClick={openModalPotCreate}
              className="bg-secondary p-4 rounded-lg hover:bg-primaryBlack"
            >
              Ajouter un pot
            </button>
            <PotForm
              isOpen={isModalPotCreateOpen}
              onClose={closeModalPotCreate}
              type="Créer"
              ajouterPot={ajouterPot}
            />
          </div>
          <ul className="flex flex-col gap-4">
            {pots.map((pot) => (
              <div key={pot.id}>
                <li className="flex justify-between items-center gap-4 p-4 border-b-2  bg-slate-100 rounded-lg">
                  <p className="font-bold">{pot.namePot}</p>
                  <p className="font-bold">
                    {pot.potColors && pot.potColors.length > 0
                      ? pot.potColors[0].colorName
                      : "Couleur non spécifiée"}
                  </p>
                  <p className="text-[0.8rem]">10 €</p>
                  {pot.imageUrl ? (
                    <Image
                      src={pot.imageUrl}
                      alt={pot.namePot}
                      width={100}
                      height={100}
                      className="h-20 w-20 object-contain object-center rounded-lg"
                    />
                  ) : (
                    <div
                      style={{
                        width: "100px",
                        height: "100px",
                        backgroundColor: "#ccc",
                      }}
                    >
                      Image non disponible
                    </div>
                  )}
                </li>
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => openModalPotModif(pot.id)}
                    className="bg-secondary px-4 py-1 rounded-lg hover:bg-primaryBlack text-white text-[0.8rem]"
                  >
                    Modifier
                  </button>

                  <button
                    onClick={() => openModalPotSupp(pot.id)}
                    className="bg-red-800 px-4 py-1 rounded-lg hover:bg-red-950 text-white text-[0.8rem]"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
            {isModalPotModifOpen && (
              <PotForm
                isOpen={!!isModalPotModifOpen}
                onClose={closeModalPotModif}
                type="Modifier"
                ajouterPot={ajouterPot}
                pot={selectedPot}
                potId={selectedPot?.id}
                potColor={selectedPot?.potColors[0].colorName}
              />
            )}
            {isModalPotSuppOpen && (
              <ModalSuppPot
                isOpen={!!isModalPotSuppOpen}
                onClose={closeModalPotSupp}
                potId={selectedPot?.id}
                supprimerPot={supprimerPot}
              />
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
