"use client";
import { userDefaultValues } from "@/constants";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type UserFormProps = {
  isOpen: boolean;
  onClose: () => void;
  user?: UserType;
  userId?: string;
  type: "Créer" | "Modifier";
  ajouterUser: (nouvelUser: UserType) => void;
};

export const UserForm = ({
  isOpen,
  onClose,
  user,
  userId,
  type,
  ajouterUser,
}: UserFormProps) => {
  const [loading, setLoading] = useState(false);

  //! Valeur initiale du formulaire : si l'utilisateur existe, les valeurs sont pré-remplies avec les données de l'utilisateur
  const initialValues = userDefaultValues;

  //! Utilisation de react-hook-form pour gérer le formulaire
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
    getValues,
  } = useForm({ defaultValues: initialValues });

  //! Modal
  if (!isOpen) return null;

  const onSubmit = async (data: FieldValues) => {
    console.log(data);

    if (type === "Créer") {
      try {
        setLoading(true);
        const newUser = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (newUser) {
          const ajoutUser = await newUser.json();
          toast.success("Utilisateur créé avec succés");
          ajouterUser(ajoutUser);
          reset();
          onClose();
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        toast.error("Erreur lors de la création de l'utilisateur");
        setLoading(false);
      }
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-4 rounded w-[80%]">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="flex flex-col gap-1 lg:gap-8">
            <div className="w-full flex gap-2">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Nom"
                  className="p-4 mb-2 w-full rounded-lg text-primaryBlack text-[0.8rem] lg:text-[1rem] bg-slate-100"
                  {...register("nom", {
                    required: "Le nom est requis.",
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
                  className="p-4 mb-2 w-full rounded-lg text-primaryBlack text-[0.8rem] lg:text-[1rem] bg-slate-100"
                  {...register("prenom", {
                    required: "Le prénom est requis.",
                  })}
                />
                {errors.prenom && (
                  <p className="text-red-500">{`${errors.prenom.message}`}</p>
                )}
              </div>
            </div>

            <div className="w-full flex gap-2">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Email"
                  className="p-4 mb-2 w-full rounded-lg text-primaryBlack text-[0.8rem] lg:text-[1rem] bg-slate-100"
                  {...register("email", {
                    required: "L'email est requis.",
                  })}
                />
                {errors.email && (
                  <p className="text-red-500">{`${errors.email.message}`}</p>
                )}
              </div>
              <div className="w-full">
                <select
                  className="p-4 mb-2 w-full rounded-lg text-primaryBlack text-[0.8rem] lg:text-[1rem] bg-slate-100"
                  {...register("role")}
                >
                  <option value="">Choisir le rôle</option>
                  <option value="user">Utilisateur</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>
            </div>
          </div>

          {type === "Créer" && (
            <div className="w-full flex gap-2">
              <div className="w-full">
                <input
                  type="password"
                  placeholder="Mot de Passe"
                  className="p-4 mb-2 w-full rounded-lg text-primaryBlack text-[0.8rem] lg:text-[1rem] bg-slate-100"
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
                  className="p-4 mb-2 w-full rounded-lg text-primaryBlack text-[0.8rem] lg:text-[1rem] bg-slate-100"
                  {...register("confirmPassword", {
                    required: "Le mot de passe est obligatoire.",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Les mots de passe ne correspondent pas.",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
                )}
              </div>
            </div>
          )}

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
