"use client"; // Rendu côté client pour les intéractions avec le formulaire de connexion
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/hooks/store";
import Link from "next/link";
import toast from "react-hot-toast";
import { useState } from "react";

// Definition du type pour le store global
type UseUserStoreType = {
  updateUser: (user: any) => void;
};

const ConnexionForm = () => {
  const [loading, setLoading] = useState(false);

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
    try {
      setLoading(true);
      const connexion = await fetch(`/api/auth/connexion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (connexion.ok) {
        console.log("User connected");
        const userToStore = await connexion.json();
        localStorage.setItem("user", JSON.stringify(userToStore));
        updateUser(userToStore); // Mise à jour du store global avec l'utilisateur connecté
        toast.success(`Bienvenue ${userToStore.nom} ${userToStore.prenom} !`);
        setLoading(false);
        router.push("/"); // Redirection de l'utilisateur vers la page d'accueil
        reset();
      } else {
        // Gestion des réponses non réussies
        const errorResponse = await connexion.json(); // Supposons que l'API renvoie un message d'erreur dans le corps de la réponse
        toast.error(
          errorResponse.message ||
            "Erreur lors de la connexion. Veuillez réessayer plus tard."
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la connexion. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)} // onSubmit est une fonction de react-hook-form + Appel de la fonction onSubmit crée au-dessus
        className="flex flex-col justify-center gap-4 bg-black bg-opacity-0 backdrop-filter backdrop-blur p-8 rounded-lg shadow-xl lg:w-1/2"
      >
        <div>
          <input
            type="mail"
            placeholder="Mail"
            className="p-4 mb-2 w-full rounded-lg"
            {...register("email", { required: "Le mail est obligatoire." })}
          />
          {errors.email && (
            <p className="text-red-500">{`${errors.email.message}`}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <input
            type="password"
            placeholder="Mot de passe"
            className="p-4 mb-2 w-full rounded-lg "
            {...register("password", {
              required: "Le mot de passe est obligatoire.",
              minLength: {
                value: 8,
                message: "Le mot de passe doit contenir au moins 8 caractères.",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500">{`${errors.password.message}`}</p>
          )}
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
          <div className="">
            <button
              type="submit"
              className="p-4 mb-2 w-full bg-primaryBlack rounded-lg text-white hover:bg-secondary transition-all duration-300 ease-in-out"
            >
              Se Connecter
            </button>
            <p className="text-center text-white">
              Vous n&apos;avez pas encore de compte ?{" "}
              <Link
                href="/inscription"
                className="underline hover:text-tertiary"
              >
                Créer un compte
              </Link>
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default ConnexionForm;
