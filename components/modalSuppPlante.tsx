import toast from "react-hot-toast";

type ModalSuppPlanteProps = {
  isOpen: boolean;
  onClose: () => void;
  plantId: string;
  supprimerPlante: (id: string) => void;
};

export const ModalSuppPlante = ({
  isOpen,
  onClose,
  plantId,
  supprimerPlante,
}: ModalSuppPlanteProps) => {
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/plantes/${plantId}`, {
        method: "DELETE",
        body: JSON.stringify({ id: plantId }),
      });
      if (res.ok) {
        console.log("Plante supprimée");
        toast.success("Plante supprimée");
        supprimerPlante(plantId);
        onClose();
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la suppression de la plante");
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex justify-center items-center">
      <div className="flex flex-col gap-4 bg-white p-4 rounded w-[80%] lg:w-[30%]">
        <h2>
          Êtes-vous sûr de vouloir supprimer cette plante ?{" "}
          <span className="font-bold">Cette action est irréversible.</span>
        </h2>
        <div className="flex justify-evenly gap-8">
          <button
            onClick={handleDelete}
            className="w-full p-4 mb-2 bg-red-800 rounded-lg text-white hover:bg-red-900 transition-all duration-300 ease-in-out"
          >
            Oui
          </button>
          <button
            onClick={onClose}
            className="w-full p-4 mb-2 bg-primaryBlack rounded-lg text-white hover:bg-secondary transition-all duration-300 ease-in-out"
          >
            Non
          </button>
        </div>
      </div>
    </div>
  );
};
