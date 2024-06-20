"use client";
import { useUserStore } from "@/hooks/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import { IoLogOutOutline } from "react-icons/io5";
import toast from "react-hot-toast";

// Definition du type pour le store global
type UseUserStoreType = {
  user: any;
  deleteUser: () => void;
};

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Utilisation du store global pour vérifier s'il est conecté afin d'afficher les boutons de connexion ou non
  const { user, deleteUser } = useUserStore() as UseUserStoreType;

  //! PBM  : Lors de la connexion, il faut rafraichir la page pour que le bouton déconnexion apparaisse
  // Vérification de la connexion de l'utilisateur et mis à jour du state isLoggedIn
  const checkLoginStatus = () => {
    const userStorage = localStorage.getItem("user");
    if (userStorage) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  // Vérification de la connexion de l'utilisateur lors du chargement de la page en fonction de l'utilisateur connecté ou non
  useEffect(() => {
    checkLoginStatus();
  }, [user]);

  // Fonction pour déconnecter l'utilisateur + Suppression du user stocké en local storage + Mise à jour du store global
  const onLogout = async () => {
    localStorage.removeItem("user");
    deleteUser();
    setIsLoggedIn(false);
    toast.success("A la prochaine !");
    router.push("/");
  };

  // Vérification : Admin ou User
  const userConnected = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = userConnected?.role === "admin";

  // Détermine si l'utilisateur est sur la page d'accueil
  const isHomePage = pathname === "/";

  return (
    <div
      className={`w-full ${
        isHomePage
          ? "bg-primaryBlack bg-opacity-50 lg:bg-transparent backdrop-filter backdrop-blur-lg lg:backdrop-blur-sm"
          : "bg-primaryBlack shadow-xl"
      }`}
    >
      <div className="wrapper flex justify-between items-center">
        <Link href="/">
          <h1 className="h2-bold text-white">KAP</h1>
        </Link>

        <div className="flex gap-2 items-center text-white">
          {!isLoggedIn ? (
            <>
              <Link href="/connexion">
                <button
                  type="button"
                  className="bg-secondary hover:bg-primary transition-all ease-in-out px-4 py-2 rounded-lg"
                >
                  Se connecter
                </button>
              </Link>
            </>
          ) : (
            <>
              <p className="font-bold text-[0.8rem] lg:text-[1rem]">
                {userConnected.nom} {userConnected.prenom}
              </p>
              {isAdmin && (
                <div className="flex gap-2">
                  <Link href="/admin">
                    <button
                      type="button"
                      className="text-[0.8rem] lg:text-[1rem] bg-secondary hover:bg-primary transition-all ease-in-out px-2 py-1 lg:px-4 lg:py-2 rounded-lg"
                    >
                      Espace Admin
                    </button>
                  </Link>
                </div>
              )}
              <button onClick={onLogout}>
                <IoLogOutOutline
                  className="w-6 h-auto hover:text-tertiary transition-all ease-in-out"
                  aria-label="Déconnexion"
                />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

// const onLogout = async () => {
// // Récupération du user stocké en local storage
// const userItem = localStorage.getItem("user");
// const user = userItem ? JSON.parse(userItem) : null;

// localStorage.removeItem("user");
// setIsLoggedIn(false);

// try {
//   const response = await fetch(`/api/auth/logout`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email: user.email }),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to logout");
//   }
//   localStorage.removeItem("user");
//   setIsLoggedIn(false);
// } catch (error) {
//   console.error("Erreur lors de la déconnexion:", error);
// }
// };
