"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface KitFormPotRondProps {
  pots: PotType[];
  plantes: PlantType[];
}

const KitForm: React.FC<KitFormPotRondProps> = ({ pots, plantes }) => {
  //! Etat pour stocker les pots ronds
  const [potRond, setPotRond] = useState<PotType[]>([]);

  //! Etat pour stocker le pot et la plante selectionnés
  const [selectedPot, setSelectedPot] = useState<PotType | null>(null);
  const [selectedPlante, setSelectedPlante] = useState<PlantType | null>(null);

  useEffect(() => {
    if (plantes.length > 0) {
      setSelectedPlante(plantes[0]); // Initialiser avec la première plante par défaut
    }
    if (pots.length > 0) {
      const potsRonds = pots.filter((pot: PotType) =>
        pot.namePot.includes("Rond")
      );
      setPotRond(potsRonds);
      setSelectedPot(pots[0]);
    }
  }, [plantes, pots]);

  //! Gestion du changement de pot
  const handlePotChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const potId = e.target.value;
    const pot = pots.find((p: PotType) => p.id === Number(potId));
    setSelectedPot(pot || null);
  };

  //! Gestion du changement de plante
  const handlePlanteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const planteId = e.target.value;
    console.log(planteId);
    const plante = plantes.find((p) => p.id === Number(planteId));
    setSelectedPlante(plante || null);
  };

  return (
    <>
      <section className="flex flex-col justify-center lg:flex-none lg:grid lg:grid-cols-3 gap-4 mt-10 mb-12">
        <div className="flex flex-col justify-center items-center gap-4 w-full p-4 lg:p-8 rounded-lg bg-secondary">
          <div className="flex flex-col gap-2 lg:gap-4">
            <h2 className="font-bold text-[1.5rem] lg:text-[2rem] text-center text-white">
              Choix du pot
            </h2>
            <form className="w-full">
              <select
                name="pot"
                onChange={handlePotChange}
                className="bg-slate-100 w-full rounded-lg text-center py-1"
              >
                {potRond &&
                  potRond.map((pot: PotType) => (
                    <option key={pot.id} value={pot.id}>
                      {pot.namePot}
                    </option>
                  ))}
              </select>
            </form>

            <h2 className="font-bold text-[1.5rem] lg:text-[2rem] text-center text-white">
              Choix de la plante
            </h2>
            <form className="w-full">
              <select
                name="pot"
                className="bg-slate-100 w-full rounded-lg text-center py-1"
                onChange={handlePlanteChange}
              >
                {plantes &&
                  plantes.map((plante: PlantType) => (
                    <option key={plante.id} value={plante.id}>
                      {plante.namePlante}
                    </option>
                  ))}
              </select>
            </form>
          </div>
        </div>

        {/* Images de la plante et du pot selectionnés */}
        <div className="w-full h-full flex flex-col justify-center items-center px-16 py-4 bg-tertiary rounded-lg">
          {selectedPlante && (
            <Image
              src={selectedPlante.imageUrl}
              alt="plante"
              width={200}
              height={200}
              className="h-auto max-w-none mb-[-1.2rem] z-10 "
            />
          )}

          {selectedPot && (
            <Image
              src={selectedPot.imageUrl}
              alt="pot"
              width={100}
              height={100}
              className=" h-auto max-w-none"
            />
          )}
        </div>

        <div className="flex flex-col items-center justify-center gap-4 w-full p-4 lg:p-8 rounded-lg bg-secondary">
          {selectedPlante && (
            <>
              <h2 className="font-bold text-[1.5rem] lg:text-[2rem] text-center text-white">
                {selectedPlante.namePlante}
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 items-center">
                  <p className="text-[0.8rem] text-white">
                    {selectedPlante.description}
                  </p>
                </div>
              </div>
            </>
          )}
          {selectedPot && (
            <>
              <h2 className="font-bold text-[1.5rem] lg:text-[2rem] text-center text-white">
                {selectedPot.namePot}
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 items-center">
                  <p className="text-[0.8rem] text-white">
                    Le pot est de couleur : {selectedPot.potColors[0].colorName}
                    . En fibre de ....
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {selectedPlante && selectedPot && (
        <div className="flex flex-col gap-1 lg:flex-none lg:grid lg:grid-cols-3 lg:gap-2 bg-primary text-center text-white rounded-lg py-2 px-4">
          <p className="uppercase font-bold py-1 px-1 lg:px-0 rounded-lg text-[0.8rem] lg:text-[1rem] my-auto">
            Pot :{" "}
            <span className="font-bold"> {selectedPot.namePot} - 20 €</span>
          </p>
          <p className="uppercase font-bold py-1 px-1 lg:px-0 rounded-lg text-[0.8rem] lg:text-[1rem] my-auto">
            {" "}
            Plante :{" "}
            <span className="font-bold">
              {" "}
              {selectedPlante.namePlante} 20 €
            </span>{" "}
          </p>
          <p className="uppercase font-bold py-1 px-1 lg:px-0 bg-primaryBlack rounded-lg text-[0.8rem] lg:text-[1rem] my-auto">
            Total : 40 €
          </p>
          {/* Total : {selectedPlante.price + selectedPot.price} € */}
        </div>
      )}
    </>
  );
};

export default KitForm;
