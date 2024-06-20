"use client";
import { ModalSuppUser } from "@/components/ModalSuppUser";
import { UserForm } from "@/components/UserForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function UserAdminPage() {
  const router = useRouter();

  //! Créations d'un états pour stocker les USERS
  const [users, setUsers] = useState<UserType[]>([]);

  //! Récupération des USERS
  useEffect(() => {
    const userAdmin = JSON.parse(localStorage.getItem("user") || "{}");
    const isAdmin = userAdmin?.role === "admin";

    if (!isAdmin) {
      router.push("/");
    }

    const fetchUsers = async () => {
      const response = await fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, [router]);

  //! Pour mettre à jour le state des plantes avec une nouvelle plante ajoutée et l'afficher dynamiquement
  const ajouterUser = (nouveauUser: UserType) => {
    setUsers((UsersActuels) => {
      const index = UsersActuels.findIndex(
        (plante) => plante.id === nouveauUser.id
      );
      if (index >= 0) {
        // La plante existe déjà, la remplacer
        const nouveauxUsers = [...UsersActuels];
        nouveauxUsers[index] = nouveauUser;
        return nouveauxUsers;
      } else {
        // La plante n'existe pas, l'ajouter à la fin
        return [...UsersActuels, nouveauUser];
      }
    });
  };
  const supprimerUser = (userId: string) => {
    setUsers((UsersActuels) =>
      UsersActuels.filter((user) => user.id !== userId)
    );
  };

  //! Gestion des modales USERS : Création & Modification
  // Gestion de la modale de création
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const openModalCreate = () => setIsModalCreateOpen(true);
  const closeModalCreate = () => setIsModalCreateOpen(false);

  // Gestion de la modale de modification
  const [isModalModifOpen, setIsModalModifOpen] = useState(false);
  const [selectedUserIdForModif, setSelectedUserIdForModif] = useState<
    string | null
  >(null);
  const openModalModif = (id: string) => {
    setSelectedUserIdForModif(id);
    setIsModalModifOpen(true);
  };
  const closeModalModif = () => {
    setSelectedUserIdForModif(null);
    setIsModalModifOpen(false);
  };

  // Gestion de la modale de suppression
  const [isModalUserSuppOpen, setIsModalUserSuppOpen] = useState(false);

  const openModalPlantSupp = (id: string) => {
    setSelectedUserIdForModif(id);
    setIsModalUserSuppOpen(true);
  };
  const closeModalUserSupp = () => setIsModalUserSuppOpen(false);

  useEffect(() => {
    console.log("selectedPlantIdForModif a changé:", selectedUserIdForModif);
  }, [selectedUserIdForModif]);

  const selectedUser = users.find((user) => user.id === selectedUserIdForModif);

  return (
    <section className="wrapper flex flex-col gap-2 my-20 z-10 relative h-[100vh]">
      <div className="flex flex-row gap-2">
        <Link
          href="/admin/plantes"
          className="text-[0.8rem] lg:text-[1rem] text-center text-white font-bold tracking-widest uppercase p-2 bg-secondary rounded-lg hover:bg-primaryBlack transition-all duration-300 ease-in-out"
        >
          Voir les plantes
        </Link>
        <Link
          href="/admin/pots"
          className="text-[0.8rem] lg:text-[1rem] text-center text-white font-bold tracking-widest uppercase p-2 bg-secondary rounded-lg hover:bg-primaryBlack transition-all duration-300 ease-in-out"
        >
          Voir les pots
        </Link>
      </div>
      <div className="w-full flex flex-col gap-4 rounded-lg">
        <div className="flex justify-between items-center bg-primary rounded-lg text-white font-bold p-4">
          <h2 className="font-bold text-[1rem] lg:text-[1.5rem]">
            {users.length} Utilisateurs
          </h2>
          <button
            onClick={openModalCreate}
            className="bg-secondary p-4 rounded-lg hover:bg-primaryBlack"
          >
            Créer un utilisateur
          </button>
          <UserForm
            isOpen={isModalCreateOpen}
            onClose={closeModalCreate}
            type="Créer"
            ajouterUser={ajouterUser}
          />
        </div>
        <ul className="flex flex-col gap-4">
          {users.map((user) => (
            <div key={user.id}>
              <li className="flex justify-between items-center gap-4 p-4 border-b-2 bg-slate-100 rounded-lg">
                <p className="font-bold">
                  {user.nom} {user.prenom}
                </p>
                <p className="text-[0.8rem] lg:text-[1rem]">{user.email}</p>
                <p>{user.role}</p>
              </li>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => openModalPlantSupp(user.id)}
                  className="bg-red-800 px-4 py-1 rounded-lg hover:bg-red-950 text-white text-[0.8rem]"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}

          {isModalUserSuppOpen && (
            <ModalSuppUser
              isOpen={!!isModalUserSuppOpen}
              onClose={closeModalUserSupp}
              userId={selectedUser?.id}
              supprimerUser={supprimerUser}
            />
          )}
        </ul>
      </div>
    </section>
  );
}
