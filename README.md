# **KAP (Kit à Planter)**

Pour lancer le projet :

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) avec votre navigateur.

# **En savoir plus**

**_Les technologies utilisées_** : TypeScript, Next.js, React.js, PostgreSQL, Prisma, TailwindCSS, React-Hook-Form, Zustand, Bcrypt, UploadThing.

Il y a une page d'accueil, une page de connexion, une page d'inscription, une page administrateur et enfin une page de conception du kit.

# **Guide d'utilisation**

### **Page d'accueil**

Sur la page d'accueil, nous avons deux boutons : `Concevoir mon kit` et `Se Connecter`. Pour accéder à la page de Conception du kit, il va falloir être connecté. Appuyer sur ce bouton vous redirigera automatiquement vers la page de connexion s'il vous ne l'êtes pas.

Le logo KAP permet d'accéder à la page d'accueil.

Si vous êtes connecté, vous pouvez vous déconnecter en appuyant sur le logo de déconnexion qui se trouve en haut à droite.

### **Page de connexion & d'inscription**

Vous pouvez vous connecter en remplissant le formulaire de connexion avec votre mail et votre mot de passe si vous vous êtes déjà inscrit.  
Si ce n'est pas le cas, un lien vous redirige vers la page d'inscription pour y rentrer vos informations afin de créer un compte sur notre application web.

### **Page de Conception**

Vous vous êtes connecté et vous avez donc accès à la page de conception. Par défaut, cette page est initialisé sur la conception d'un kit avec un pot rond. Pour changer de modèle de pot, vous pouvez cliquer sur l'un des deux boutons en haut de la page qui changera le modèle du formulaire.

Vous pouvez d'abord choisir votre pot via le select, puis vous pouvez choisir vos plantes de la même manière. Ces éléments s'afficheront dynamiquement sur l'écran afin de vous montrer le résultat de vos choix.

Les prix du pot et des plantes s'afficheront juste en dessous pour vous indiquer combien coute chaque élément ainsi que le total.

### **Page Administrateur**

Pour accéder à cette page, vous devez vous connecter en tant qu'admin. Cela fera apparaitre un bouton qui vous redirigera vers l'espace Admin.  
Ici, vous pouvez voir toutes les plantes et tous les pots qui ont été ajoutés. Vous pouvez ajouter un pot ou une plante, les modifier ou les supprimer en appuyant sur les boutons correspondant.  
Cela ouvrira une fenêtre modal qui vous permettra de remplir le formulaire pour l'action en question. Le bouton "fermer" des formulaires vient annuler le processus.
