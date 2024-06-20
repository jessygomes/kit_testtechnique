"use client";
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/hooks/store";

// Definition du type pour le store global
type UseUserStoreType = {
  updateUser: (user: any) => void;
};

// Utilisation du package REACT-HOOK-FORM pour la gestion des formulaires
const InscriptionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
    getValues,
  } = useForm();

  const router = useRouter(); // Utilisation de la fonction useRouter pour rediriger l'utilisateur
  const { updateUser } = useUserStore() as UseUserStoreType; // Utilisation du store global pour stocker l'utilisateur connecté

  // Fonction pour envoyer les données du formulaire d'inscription
  const onSubmit = async (data: FieldValues) => {
    console.log(data);

    try {
      const response = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error while creating user");
      } else {
        console.log("User created");
        const userToStore = await response.json();
        localStorage.setItem("user", JSON.stringify(userToStore));
        updateUser(userToStore); // Mise à jour du store global avec l'utilisateur connecté
        router.push("/"); // Redirection de l'utilisateur vers la page d'accueil
      }

      return response.json();
    } catch (error) {
      console.error(error);
    }

    reset();
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)} // onSubmit est une fonction de react-hook-form + Appel de la fonction onSubmit crée au-dessus
        className="flex flex-col justify-center gap-2 bg-black bg-opacity-0 backdrop-filter backdrop-blur p-8 rounded-lg shadow-xl lg:w-1/2"
      >
        <div className="flex flex-col lg:flex-row gap-2">
          <div className="w-full">
            <input
              type="text"
              placeholder="Nom"
              className="p-2 lg:p-4 mb-1 lg:mb-2 w-full rounded-lg"
              {...register("nom", {
                required: "Le nom est obligatoire.",
                minLength: {
                  value: 2,
                  message: "Le nom doit contenir au moins 2 caractères.",
                },
                maxLength: {
                  value: 30,
                  message: "Le nom doit contenir au maximum 30 caractères.",
                },
              })}
            />
            {errors.nom && (
              <p className="text-red-500">{`${errors.nom.message}`}</p>
            )}
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="Prénom"
              className="p-2 lg:p-4 mb-1 lg:mb-2 w-full rounded-lg"
              {...register("prenom", {
                required: "Le prénom est obligatoire.",
                minLength: {
                  value: 2,
                  message: "Le prénom doit contenir au moins 2 caractères.",
                },
                maxLength: {
                  value: 30,
                  message: "Le prénom doit contenir au maximum 30 caractères.",
                },
              })}
            />
            {errors.prenom && (
              <p className="text-red-500">{`${errors.prenom.message}`}</p>
            )}
          </div>
        </div>

        <div>
          <input
            type="mail"
            placeholder="Mail"
            className="p-2 lg:p-4 mb-1 lg:mb-2 w-full rounded-lg"
            {...register("email", { required: "Le mail est obligatoire." })}
          />
          {errors.email && (
            <p className="text-red-500">{`${errors.email.message}`}</p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-2">
          <div className="w-full">
            <input
              type="password"
              placeholder="Mot de passe"
              className="p-2 lg:p-4 mb-1 lg:mb-2 w-full rounded-lg"
              {...register("password", {
                required: "Le mot de passe est obligatoire.",
                minLength: {
                  value: 8,
                  message:
                    "Le mot de passe doit contenir au moins 8 caractères.",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500">{`${errors.password.message}`}</p>
            )}
          </div>

          <div className="w-full">
            <input
              type="password"
              placeholder="Confirmation du Mot de passe"
              className="p-2 lg:p-4 mb-2 w-full rounded-lg"
              {...register("passwordConfirmation", {
                required: "Le mot de passe est obligatoire.",
                validate: (value) =>
                  value === getValues("password") ||
                  "Les mots de passe ne correspondent pas.",
              })}
            />
            {errors.passwordConfirmation && (
              <p className="text-red-500">{`${errors.passwordConfirmation.message}`}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitted}
          className="p-2 lg:p-4 mb-2 bg-primaryBlack rounded-lg text-white hover:bg-secondary transition-all duration-300 ease-in-out"
        >
          S&apos;inscrire
        </button>
        <p className="text-center text-white">
          Vous avez déjà un compte ?{" "}
          <Link href="/connexion" className="underline hover:text-tertiary">
            Connectez-vous
          </Link>
        </p>
      </form>
    </div>
  );
};

export default InscriptionForm;
