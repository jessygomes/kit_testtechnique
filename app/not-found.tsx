import BtnKit from "@/components/BtnKit";
import Image from "next/image";
import Link from "next/link";

export default async function NotFound() {
  /* 
  Dans ce projet, j'ai utilisé Prisma pour la gestion de la base de données. J'ai fait les appels à la BDD avec FETCH pour récupérer les données en faisant comme-ci mon back-end était séparé, mais j'aurai pu utiliser Prisma directement comme ceci depuis un composant : 
    const plantes = await prisma.plante.findMany();
  */

  return (
    <main className="relative">
      <Image
        src="/images/plant.png"
        alt="hero"
        width={1920}
        height={1080}
        className="absolute z-0 h-[100vh] md:h-[100vh] w-full object-cover"
      />
      <section className="wrapper flex flex-col gap-2 justify-center z-10 relative h-[100vh]">
        <div className="w-full mt-[6rem] flex flex-col gap-4 justify-center items-center rounded-lg p-8 bg-primaryBlack bg-opacity-0 backdrop-filter backdrop-blur-sm">
          <h1 className="h1-bold text-white">Page introuvable</h1>
          <h2 className="text-[1rem] md:text-[1.5rem] text-left lg:text-center text-white"></h2>
        </div>
        <div className="w-full text-center">
          <Link href="/">Retour à l&apos;accueil</Link>
        </div>
      </section>
    </main>
  );
}
