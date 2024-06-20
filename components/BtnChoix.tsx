"use client";
import { useEffect, useState } from "react";
import KitForm from "./KitFormPotRond";
import { KitFormJardiniere } from "./KitFormJardiniere";

export const BtnChoix = () => {
  //! Gestion des états
  const [pots, setPots] = useState<PotType[]>([]);
  const [plantes, setPlantes] = useState<PlantType[]>([]);

  //! Récupération des pots et plantes
  useEffect(() => {
    const fetchPots = async () => {
      const res = await fetch("/api/pots");
      const data = await res.json();

      setPots(data);
    };

    const fetchPlantes = async () => {
      const res = await fetch("/api/plantes");
      const data = await res.json();
      setPlantes(data);
    };

    fetchPots();
    fetchPlantes();
  }, []);

  //! Afficher le formulaire en fonction du choix
  const [choix, setChoix] = useState("potRond");

  return (
    <div className="flex flex-col justify-center mt-10">
      <div className="flex justify-center gap-4">
        <button
          className={`${
            choix === "potRond" ? "bg-primary" : "bg-secondary"
          } hover:bg-primary transition-all ease-in-out px-4 py-2 rounded-lg text-white uppercase font-bold tracking-widest`}
          onClick={() => setChoix("potRond")}
        >
          Pot Rond
        </button>
        <button
          className={`${
            choix === "jardiniere" ? "bg-primary" : "bg-secondary"
          } hover:bg-primary transition-all ease-in-out px-4 py-2 rounded-lg text-white uppercase font-bold tracking-widest`}
          onClick={() => setChoix("jardiniere")}
        >
          Jardinière
        </button>
      </div>
      <div>
        {/* passage des données en props */}
        {choix === "potRond" && <KitForm pots={pots} plantes={plantes} />}
        {choix === "jardiniere" && (
          <KitFormJardiniere pots={pots} plantes={plantes} />
        )}
      </div>
    </div>
  );
};
