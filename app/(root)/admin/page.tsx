"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const router = useRouter();

  //! Vérification : Admin ou User + FETCH des plantes depuis l'API
  useEffect(() => {
    const userAdmin = JSON.parse(localStorage.getItem("user") || "{}");
    const isAdmin = userAdmin?.role === "admin";

    if (!isAdmin) {
      router.push("/"); // Renvoie à l'accueil si l'utilisateur n'est pas un admin
    }
  }, [router]);

  //! Affichage des plantes & pots
  return (
    <section className="wrapper flex flex-col justify-center gap-2 z-10 relative h-[100vh]">
      <div className="flex flex-col lg:grid grid-cols-3 gap-4">
        <Link
          href="/admin/users"
          className="text-[1.5rem] lg:text-[2rem] text-center text-white font-bold tracking-widest uppercase p-10 lg:p-20 bg-primary rounded-lg hover:bg-secondary transition-all duration-300 ease-in-out"
        >
          Voir les utilisateurs
        </Link>
        <Link
          href="/admin/plantes"
          className="text-[1.5rem] lg:text-[2rem] text-center text-white font-bold tracking-widest uppercase p-10 lg:p-20 bg-secondary rounded-lg hover:bg-primaryBlack transition-all duration-300 ease-in-out"
        >
          Voir les plantes
        </Link>
        <Link
          href="/admin/pots"
          className="text-[1.5rem] lg:text-[2rem] text-center text-white font-bold tracking-widest uppercase p-10 lg:p-20 bg-primaryBlack rounded-lg hover:bg-primary transition-all duration-300 ease-in-out"
        >
          Voir les pots
        </Link>
      </div>
    </section>
  );
}
