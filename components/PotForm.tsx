import { potDefaultValues } from "@/constants";
import { useUploadThing } from "@/lib/uploadthing";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { UploadImg } from "./UploadImg";
import toast from "react-hot-toast";

type PotFormProps = {
  isOpen: boolean;
  onClose: () => void;
  pot?: PotType; // Le type est défini dans le fichier type.d.ts
  potId?: string;
  potColor?: string;
  type: "Créer" | "Modifier"; // Le type du form pour savoir s'il faut créer ou modifier
  ajouterPot: (nouvellePlante: PotType) => void;
};

const PotForm = ({
  isOpen,
  onClose,
  pot,
  potId,
  type,
  ajouterPot,
  potColor,
}: PotFormProps) => {
  const [loading, setLoading] = useState(false);
  //! Valeur initiale du formulaire : si la plante existe, les valeurs sont pré-remplies avec les données de la plante
  const initialValues =
    pot && type === "Modifier"
      ? {
          ...pot,
          color: potColor,
        }
      : potDefaultValues;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
    getValues,
    setValue,
  } = useForm({ defaultValues: initialValues });

  //! Gestions des images
  const [files, setFiles] = useState<File[]>([]);

  const { startUpload } = useUploadThing("imageUploader"); // Custom hook défini dans le fichier lib

  const handleImageUrlChange = (imageUrl: any) => {
    setValue("imageUrl", imageUrl);
  };

  // ! Gestion des couleurs
  // État pour stocker les couleurs chargées et la nouvelle couleur
  const [couleurs, setCouleurs] = useState<string[]>([]);
  const [nouvelleCouleur, setNouvelleCouleur] = useState("");

  useEffect(() => {
    // Fonction pour charger les couleurs depuis la base de données
    const chargerCouleurs = async () => {
      try {
        const reponse = await fetch("/api/couleurs");
        const couleurs = await reponse.json();
        setCouleurs(couleurs);
      } catch (erreur) {
        console.error("Erreur lors du chargement des couleurs:", erreur);
      }
    };

    chargerCouleurs();
  }, []);

  // Gérer la sélection d'ajouter une nouvelle couleur
  const handleSelectChange = (event: any) => {
    if (event.target.value === "ajouterNouvelleCouleur") {
      // Afficher un champ de saisie pour une nouvelle couleur
      // Cela peut être géré via un état qui affiche conditionnellement un champ de saisie
    } else {
      // Mettre à jour la valeur de la couleur normalement
      setValue("color", event.target.value);
    }
  };

  // Gérer l'ajout d'une nouvelle couleur à la base de données
  const ajouterNouvelleCouleur = async (couleur: string) => {
    try {
      await fetch("/api/couleurs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ couleur }),
      });
      // Recharger les couleurs ou ajouter la nouvelle couleur à l'état local
      setCouleurs([...couleurs, couleur]);
    } catch (erreur) {
      console.error("Erreur lors de l'ajout d'une nouvelle couleur:", erreur);
    }
  };

  //! Modal
  if (!isOpen) return null;

  //! SOUMISSION DU FORMULAIRE
  const onSubmit = async (data: FieldValues) => {
    console.log(data);

    let uploadedImgUrl = data.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) return;

      uploadedImgUrl = uploadedImages[0].url;
    }

    // Création d'un objet avec les données du formulaire et le chemin/URL de l'image
    const modifiedData = {
      ...data,
      imageUrl: uploadedImgUrl,
    };

    const updatedData = {
      ...data,
      imageUrl: uploadedImgUrl,
      id: potId,
    };

    // Si on créé un pot
    if (type === "Créer") {
      try {
        setLoading(true);
        const newPot = await fetch("/api/pots", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(modifiedData),
        });
        if (newPot) {
          const potAjoutee = await newPot.json();
          toast.success("Pot créé avec succés");
          ajouterPot(potAjoutee); // Mis à jour l'état dans le composant parent
          onClose(); // Fermer la modal formulaire
          reset();
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        toast.error("Erreur lors de la création du pot");
        setLoading(false);
      }
    }

    // Si on modifie un pot
    if (type === "Modifier") {
      try {
        setLoading(true);
        const updatedPot = await fetch(`/api/pots/${potId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });
        if (updatedPot) {
          const potModif = await updatedPot.json();
          toast.success("Pot modifié avec succés");
          ajouterPot(potModif);
          onClose();
          reset();
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        toast.error("Erreur lors de la modification du pot");
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-4 rounded w-[80%]">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="flex flex-col lg:flex-row gap-1 lg:gap-8">
            <div className="w-full">
              <div>
                <input
                  type="text"
                  placeholder="Nom du pot"
                  className="p-4 mb-2 w-full rounded-lg text-primaryBlack text-[0.8rem] lg:text-[1rem] bg-slate-100"
                  {...register("namePot", {
                    required: "Le nom du pot est requis.",
                  })}
                />
                {errors.namePot && (
                  <p className="text-red-500">{`${errors.namePot.message}`}</p>
                )}
              </div>

              <div>
                <select
                  className="p-4 mb-2 w-full rounded-lg text-primaryBlack text-[0.8rem] lg:text-[1rem] border-primaryBlack bg-slate-100"
                  {...register("color", {
                    required: "La couleur du pot est requise.",
                  })}
                >
                  <option value="">Choisir une couleur</option>
                  {couleurs.map((couleur) => (
                    <option key={couleur.id} value={couleur.id}>
                      {couleur.nameColor}
                    </option>
                  ))}
                </select>

                {errors.color && (
                  <p className="text-red-500">{`${errors.color.message}`}</p>
                )}
              </div>

              <div className="flex">
                <input
                  type="text"
                  placeholder="Ajouter une nouvelle couleur"
                  className="p-4 mb-2 w-full rounded-s-lg text-primaryBlack text-[0.8rem] lg:text-[1rem] bg-slate-100"
                  value={nouvelleCouleur}
                  onChange={(e) => setNouvelleCouleur(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => ajouterNouvelleCouleur(nouvelleCouleur)}
                  className="p-4 mb-2 bg-primary rounded-e-lg text-white text-[0.8rem] lg:text-[1rem] hover:bg-secondary transition-all duration-300 ease-in-out"
                >
                  Ajouter
                </button>
              </div>
            </div>

            <div className="w-full">
              <UploadImg
                imageUrl={getValues("imageUrl")}
                onFieldChange={handleImageUrlChange}
                setFiles={setFiles}
              />
            </div>
          </div>

          {loading ? (
            <button
              type="submit"
              disabled
              className="w-full p-4 mb-2 bg-primary rounded-lg text-white hover:bg-secondary transition-all duration-300 ease-in-out"
            >
              En cours...
            </button>
          ) : (
            <div className="flex justify-evenly gap-8">
              <button
                type="submit"
                className="w-full p-4 mb-2 bg-primary rounded-lg text-white hover:bg-secondary transition-all duration-300 ease-in-out"
              >
                {`${type}`}
              </button>
              <button
                onClick={onClose}
                className="w-full p-4 mb-2 bg-primaryBlack rounded-lg text-white hover:bg-secondary transition-all duration-300 ease-in-out"
              >
                Fermer
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PotForm;
