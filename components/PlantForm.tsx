import { plantDefaultValues } from "@/constants";
import { useUploadThing } from "@/lib/uploadthing";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { UploadImg } from "./UploadImg";
import toast from "react-hot-toast";

type PlantFormProps = {
  isOpen: boolean;
  onClose: () => void;
  plant?: PlantType; // Le type est défini dans le fichier type.d.ts
  plantId?: string;
  type: "Créer" | "Modifier"; // Le type du form pour savoir s'il faut créer ou modifier
  ajouterPlante: (nouvellePlante: PlantType) => void;
};

const PlantForm = ({
  isOpen,
  onClose,
  plant,
  plantId,
  type,
  ajouterPlante,
}: PlantFormProps) => {
  const [loading, setLoading] = useState(false);
  //! Valeur initiale du formulaire : si la plante existe, les valeurs sont pré-remplies avec les données de la plante
  const initialValues =
    plant && type === "Modifier"
      ? {
          ...plant,
        }
      : plantDefaultValues;

  //! Utilisation de react-hook-form pour gérer le formulaire
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

  //! Modal
  if (!isOpen) return null;

  //! SOUMISSION DU FORMULAIRE
  const onSubmit = async (data: FieldValues) => {
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
      id: plantId,
    };

    // Si on créé une plante
    if (type === "Créer") {
      try {
        setLoading(true);
        const newPlant = await fetch("/api/plantes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(modifiedData),
        });
        if (newPlant) {
          setLoading(false);
          const planteAjoutee = await newPlant.json();
          toast.success("Plante créée avec succés");
          ajouterPlante(planteAjoutee); // Mis à jour l'état dans le composant parent
          onClose(); // Fermer la modal formulaire
          reset();
        }
      } catch (error) {
        console.error(error);
        toast.error("Erreur lors de la création de la plante");
        setLoading(false);
      }
    }

    // Si on modifie une plante
    if (type === "Modifier") {
      try {
        setLoading(true);
        const updatedPlant = await fetch(`/api/plantes/${plantId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });
        if (updatedPlant) {
          const planteModif = await updatedPlant.json();
          toast.success("Plante modifiée avec succés");
          ajouterPlante(planteModif);
          onClose();
          reset();
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        toast.error("Erreur lors de la modification de la plante");
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
                  placeholder="Nom de la plante"
                  className="p-4 mb-2 w-full rounded-lg text-primaryBlack text-[0.8rem] lg:text-[1rem] bg-slate-100"
                  {...register("namePlante", {
                    required: "Le nom de la plante est requis.",
                  })}
                />
                {errors.namePlante && (
                  <p className="text-red-500">{`${errors.namePlante.message}`}</p>
                )}
              </div>

              <div>
                <textarea
                  placeholder="Description de la plante"
                  className="p-4 mb-2 w-full rounded-lg h-32 lg:h-40 text-primaryBlack text-[0.8rem] lg:text-[1rem] border-primaryBlack bg-slate-100"
                  {...register("description", {
                    required: "La description de la plante est requise.",
                  })}
                />
                {errors.description && (
                  <p className="text-red-500">{`${errors.description.message}`}</p>
                )}
              </div>
            </div>

            <div className="w-full">
              {/* <input
              type="file"
              placeholder="Image de la plante"
              className="p-4 mb-2 w-full rounded-lg text-primaryBlack"
              {...register("imageUrl", {
                required: "L'image de la plante est requise.",
              })}
            />
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={getValues("namePlante")}
                width={100}
                height={100}
              />
            ) : null}
            {errors.imageUrl && (
              <p className="text-red-500">{`${errors.imageUrl.message}`}</p>
            )} */}
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

export default PlantForm;
