import InscriptionForm from "@/components/InscriptionForm";
import Image from "next/image";
import Link from "next/link";

export default function Inscription() {
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
        <section className="wrapper relative h-full flex flex-col justify-center rounded-lg">
          <div className="flex flex-col gap-8">
            <h1 className="h1-bold text-white text-center">Inscription</h1>
            <InscriptionForm />
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
