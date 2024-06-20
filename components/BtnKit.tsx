"use client";
import Link from "next/link";

const BtnKit = () => {
  const user = localStorage.getItem("user"); //! PBM : qand il n'y a pas de user (err 500)

  return (
    <Link href={user ? "/conception" : "/connexion"}>
      <button className=" bg-tertiary px-8 py-4 rounded-lg text-primaryBlack hover:bg-secondary hover:text-white transition-all ease-in-out font-bold text-[1rem] md:text-[2rem] uppercase tracking-widest">
        Concevoir mon kit
      </button>
    </Link>
  );
};

export default BtnKit;
