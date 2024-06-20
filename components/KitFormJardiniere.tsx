import Image from "next/image";
import React, { useEffect, useState } from "react";

interface KitFormJardiniereProps {
  pots: PotType[];
  plantes: PlantType[];
}

export const KitFormJardiniere: React.FC<KitFormJardiniereProps> = ({
  pots,
  plantes,
}) => {
  //! Etat pour stocker les jardinières
  const [potJardiniere, setPotJardiniere] = useState<PotType[]>([]);

  //! Etat pour stocker le pot et les plantes selectionnés
  const [selectedPot, setSelectedPot] = useState<PotType | null>(null);
  // Etat pour chaque plantes (j'aurai pu faire un état sous forme Array)
  const [selectedPlante1, setSelectedPlante1] = useState<PlantType | null>(
    null
  );
  const [selectedPlante2, setSelectedPlante2] = useState<PlantType | null>(
    null
  );
  const [selectedPlante3, setSelectedPlante3] = useState<PlantType | null>(
    null
  );

  useEffect(() => {
    if (plantes.length > 0) {
      setSelectedPlante1(plantes[0]);
      setSelectedPlante2(plantes[0]);
      setSelectedPlante3(plantes[0]);
    }
    if (pots.length > 0) {
      const jardiniere = pots.filter((pot: PotType) =>
        pot.namePot.includes("Jardinière")
      );
      setPotJardiniere(jardiniere);
      setSelectedPot(jardiniere[0]);
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
    setSelectedPlante1(plante || null);
  };
  const handlePlanteChange2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const planteId = e.target.value;
    console.log(planteId);
    const plante = plantes.find((p) => p.id === Number(planteId));
    setSelectedPlante2(plante || null);
  };
  const handlePlanteChange3 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const planteId = e.target.value;
    console.log(planteId);
    const plante = plantes.find((p) => p.id === Number(planteId));
    setSelectedPlante3(plante || null);
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
                {potJardiniere &&
                  potJardiniere.map((pot: PotType) => (
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
            <form className="w-full">
              <select
                name="pot"
                className="bg-slate-100 w-full rounded-lg text-center py-1"
                onChange={handlePlanteChange2}
              >
                {plantes &&
                  plantes.map((plante: PlantType) => (
                    <option key={plante.id} value={plante.id}>
                      {plante.namePlante}
                    </option>
                  ))}
              </select>
            </form>
            <form className="w-full">
              <select
                name="pot"
                className="bg-slate-100 w-full rounded-lg text-center py-1"
                onChange={handlePlanteChange3}
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
          <div className="flex justify-center ml-6">
            {selectedPlante1 && (
              <Image
                src={selectedPlante1.imageUrl}
                alt="plante"
                width={200}
                height={200}
                className="w-[200px] h-[200px] lg:h-auto lg:max-w-none mb-[-1.3rem] lg:mb-[-1.5rem] z-10"
              />
            )}
            {selectedPlante2 && (
              <Image
                src={selectedPlante2.imageUrl}
                alt="plante"
                width={200}
                height={200}
                className="w-[200px] h-[200px] lg:h-auto lg:max-w-none mb-[-1.3rem] lg:mb-[-1.5rem] z-10 mx-[-5rem]"
              />
            )}
            {selectedPlante3 && (
              <Image
                src={selectedPlante3.imageUrl}
                alt="plante"
                width={200}
                height={200}
                className="w-[200px] h-[200px] lg:h-auto lg:max-w-none mb-[-1.3rem] lg:mb-[-1.5rem] z-10"
              />
            )}
          </div>

          {selectedPot && (
            <Image
              src={selectedPot.imageUrl}
              alt="pot"
              width={350}
              height={350}
              className="w-[450px] h-auto lg:max-w-none"
            />
          )}
        </div>

        <div className="flex flex-col items-center justify-center gap-2 lg:gap-4 w-full p-4 lg:p-8 rounded-lg bg-secondary">
          {selectedPlante1 && (
            <>
              <h2 className="font-bold text-[1.5rem] lg:text-[2rem] text-center text-white">
                {selectedPlante1.namePlante}
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 items-center">
                  <p className="text-[0.8rem] text-white">
                    {selectedPlante1.description}
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

      {selectedPlante1 && selectedPot && (
        <div className="flex flex-col gap-1 lg:flex-none lg:grid lg:grid-cols-3  lg:gap-2 bg-primary text-center text-white rounded-lg py-2 px-4">
          <p className="uppercase font-bold py-1 px-1 lg:px-0 rounded-lg text-[0.8rem] lg:text-[1rem] my-auto">
            Pot :{" "}
            <span className="font-bold"> {selectedPot.namePot} - 20 €</span>
          </p>
          <div className="flex flex-col gap-1 lg:gap-2">
            <p className="uppercase font-bold py-1 px-1 lg:px-0 rounded-lg text-[0.8rem] lg:text-[1rem] my-auto">
              {" "}
              Plante 1 :{" "}
              <span className="font-bold">
                {" "}
                {selectedPlante1.namePlante} 20 €
              </span>{" "}
            </p>
            <p className="uppercase font-bold py-1 px-1 lg:px-0 rounded-lg text-[0.8rem] lg:text-[1rem] my-auto">
              {" "}
              Plante 2 :{" "}
              <span className="font-bold">
                {" "}
                {selectedPlante2?.namePlante} 20 €
              </span>{" "}
            </p>
            <p className="uppercase font-bold py-1 px-1 lg:px-0 rounded-lg text-[0.8rem] lg:text-[1rem] my-auto">
              {" "}
              Plante 3 :{" "}
              <span className="font-bold">
                {" "}
                {selectedPlante3?.namePlante} 20 €
              </span>{" "}
            </p>
          </div>
          <p className="uppercase font-bold py-1 px-1 lg:px-0 bg-primaryBlack rounded-lg text-[0.8rem] lg:text-[1rem] my-auto">
            Total : 80 €
          </p>
          {/* Total : {selectedPlante.price + selectedPot.price} € */}
        </div>
      )}
    </>
  );
};
