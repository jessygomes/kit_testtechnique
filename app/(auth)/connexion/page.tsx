import ConnexionForm from "@/components/ConnexionForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Connexion() {
  return (
    <div className="flex">
      <Image
        src="/images/plant.png"
        alt="hero"
        width={1920}
        height={1080}
        className="absolute z-0 h-[100vh] md:h-[100vh] w-full object-cover"
      />
      <div className="w-full flex flex-col gap-8 justify-center items-center h-[100vh]">
        {/* <Link href="/">
          <h1 className="h1-bold relative text-white text-center">KAP</h1>
        </Link> */}
        <section className="wrapper relative h-full flex flex-col justify-center rounded-lg ">
          <div className="flex flex-col gap-8">
            <h1 className="h1-bold text-white text-center">Connexion</h1>
            <ConnexionForm />

            <Link href="/" className="text-center">
              <button
                type="button"
                className="bg-secondary hover:bg-primary text-white uppercase text-center transition-all ease-in-out px-4 py-2 rounded-lg tracking-widest font-bold"
              >
                Revenir à l&apos;accueil
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
