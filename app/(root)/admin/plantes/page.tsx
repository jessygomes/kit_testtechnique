"use client";
import PlantForm from "@/components/PlantForm";
import { ModalSuppPlante } from "@/components/modalSuppPlante";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PlantAdmin() {
  const router = useRouter();

  //! Création d'un state pour stocker les plantes venant de l'API
  const [plantes, setPlantes] = useState<PlantType[]>([]);

  //! Vérification : Admin ou User + FETCH des plantes depuis l'API
  useEffect(() => {
    const userAdmin = JSON.parse(localStorage.getItem("user") || "{}");
    const isAdmin = userAdmin?.role === "admin";

    if (!isAdmin) {
      router.push("/"); // Renvoie à l'accueil si l'utilisateur n'est pas un admin
    }

    const fetchPlants = async () => {
      try {
        const response = await fetch("/api/plantes");
        const data = await response.json();
        setPlantes(data); // Stockage des données récupérées dans l'état
      } catch (error) {
        console.error("Erreur lors de la récupération des plantes:", error);
      }
    };

    fetchPlants();
  }, [router]);

  //! Pour mettre à jour le state des plantes avec une nouvelle plante ajoutée et l'afficher dynamiquement
  const ajouterPlante = (nouvellePlante: PlantType) => {
    setPlantes((plantesActuelles) => {
      const index = plantesActuelles.findIndex(
        (plante) => plante.id === nouvellePlante.id
      );
      if (index >= 0) {
        // La plante existe déjà, la remplacer
        const nouvellesPlantes = [...plantesActuelles];
        nouvellesPlantes[index] = nouvellePlante;
        return nouvellesPlantes;
      } else {
        // La plante n'existe pas, l'ajouter à la fin
        return [...plantesActuelles, nouvellePlante];
      }
    });
  };
  const supprimerPlante = (plantId: string) => {
    setPlantes((plantesActuelles) =>
      plantesActuelles.filter((plante) => plante.id !== plantId)
    );
  };

  //! Gestion des modales PLANTE : Création & Modification
  // Gestion de la modale de création
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const openModalCreate = () => setIsModalCreateOpen(true);
  const closeModalCreate = () => setIsModalCreateOpen(false);

  // Gestion de la modale de modification
  const [isModalModifOpen, setIsModalModifOpen] = useState(false);
  const [selectedPlantIdForModif, setSelectedPlantIdForModif] = useState<
    string | null
  >(null);
  const openModalModif = (id: string) => {
    setSelectedPlantIdForModif(id);
    setIsModalModifOpen(true);
  };
  const closeModalModif = () => {
    setSelectedPlantIdForModif(null);
    setIsModalModifOpen(false);
  };

  // Gestion de la modale de suppression
  const [isModalPlantSuppOpen, setIsModalPlantSuppOpen] = useState(false);

  const openModalPlantSupp = (id: string) => {
    setSelectedPlantIdForModif(id);
    setIsModalPlantSuppOpen(true);
  };
  const closeModalPlantSupp = () => setIsModalPlantSuppOpen(false);

  useEffect(() => {
    console.log("selectedPlantIdForModif a changé:", selectedPlantIdForModif);
  }, [selectedPlantIdForModif]);

  const selectedPlant = plantes.find(
    (plante) => plante.id === selectedPlantIdForModif
  );
  return (
    <section className="wrapper flex flex-col gap-2 my-20 z-10 relative h-[100vh]">
      <div className="flex flex-row gap-2">
        <Link
          href="/admin/users"
          className="text-[0.8rem] lg:text-[1rem] text-center text-white font-bold tracking-widest uppercase p-2 bg-secondary rounded-lg hover:bg-primaryBlack transition-all duration-300 ease-in-out"
        >
          Voir les utilisateurs
        </Link>
        <Link
          href="/admin/pots"
          className="text-[0.8rem] lg:text-[1rem] text-center text-white font-bold tracking-widest uppercase p-2 bg-secondary rounded-lg hover:bg-primaryBlack transition-all duration-300 ease-in-out"
        >
          Voir les pots
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 justify-around">
        <div className="w-full flex flex-col gap-4 rounded-lg">
          <div className="flex justify-between items-center bg-primary rounded-lg text-white font-bold p-4">
            <h2>Nos Plantes ({plantes.length})</h2>
            <button
              onClick={openModalCreate}
              className="bg-secondary p-4 rounded-lg hover:bg-primaryBlack"
            >
              Ajouter une plante
            </button>
            <PlantForm
              isOpen={isModalCreateOpen}
              onClose={closeModalCreate}
              type="Créer"
              ajouterPlante={ajouterPlante}
            />
          </div>
          <ul className="flex flex-col gap-4">
            {plantes.map((plante) => (
              <div key={plante.id}>
                <li className="flex justify-between items-center gap-4 p-4 border-b-2 bg-slate-100 rounded-lg">
                  <p className="font-bold">{plante.namePlante}</p>
                  <p>{plante.description.slice(0, 40) + "..."}</p>
                  {/* <p className="text-[0.8rem]">10 €</p> */}
                  {plante.imageUrl ? (
                    <Image
                      src={plante.imageUrl}
                      alt={plante.namePlante}
                      width={100}
                      height={100}
                      className="h-20 w-20 object-contain object-center rounded-lg"
                    />
                  ) : (
                    // Afficher une image par défaut ou ne rien afficher
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
                    onClick={() => openModalModif(plante.id)}
                    className="bg-secondary px-4 py-1 rounded-lg hover:bg-primaryBlack text-white text-[0.8rem]"
                  >
                    Modifier
                  </button>

                  <button
                    onClick={() => openModalPlantSupp(plante.id)}
                    className="bg-red-800 px-4 py-1 rounded-lg hover:bg-red-950 text-white text-[0.8rem]"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
            {isModalModifOpen && (
              <PlantForm
                isOpen={!!isModalModifOpen}
                onClose={closeModalModif}
                type="Modifier"
                ajouterPlante={ajouterPlante}
                plant={selectedPlant}
                plantId={selectedPlant?.id}
              />
            )}
            {isModalPlantSuppOpen && (
              <ModalSuppPlante
                isOpen={!!isModalPlantSuppOpen}
                onClose={closeModalPlantSupp}
                plantId={selectedPlant?.id}
                supprimerPlante={supprimerPlante}
              />
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
