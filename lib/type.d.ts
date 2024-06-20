type PlantType = {
  id: int;
  namePlante: string;
  description: string;
  imageUrl: string;
};

type PotType = {
  id: int;
  namePot: string;
  color: string;
  imageUrl: string;
  potColors: ColorType[];
  createdAt: Date;
  updatedAt: Date;
};

type ColorType = {
  id: string;
  colorName: string;
  potId: string;
};

type PotColor = {
  potId: string;
  colorId: string;
};

type UserType = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  role: string;
};
