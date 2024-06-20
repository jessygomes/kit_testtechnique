// import formidable, { IncomingForm } from "formidable";
import { promises as fs, read } from "fs";
import path from "path";
import { NextApiHandler, NextApiRequest } from "next";
import { createRouter } from "next-connect";
import multer from "multer";

const nextConnect = createRouter();

let filename = new Date().toISOString().replace(/:/g, "-") + "-";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => cb(null, getFileName(file)),
});

const upload = multer({ storage: storage });

const getFileName = (file) => {
  filename += file.originalname;
  return filename;
};

nextConnect.use(upload.array("file"));

nextConnect.post((req, res) => {
  if (req.files && req.files.length > 0) {
    // Construisez un tableau avec les chemins des fichiers téléchargés
    const filePaths = req.files.map((file) => `/uploads/${file.filename}`);
    // Renvoyez le tableau des chemins au front-end
    res.status(200).json({ data: filePaths });
  } else {
    // Si aucun fichier n'est téléchargé, renvoyez un message d'erreur
    res.status(400).json({ error: "No files were uploaded." });
  }
});

export default nextConnect.handler({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

// const readFile = (
//   req: NextApiRequest,
//   saveLocally?: boolean
// ): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
//   const options: formidable.Options = {};

//   let savedFilePath: string | undefined;

//   if (saveLocally) {
//     options.uploadDir = path.join(process.cwd(), "/public/uploads");
//     options.filename = (name, ext, path, form) => {
//       const newFilename = Date.now().toString() + "_" + path.originalFilename;
//       savedFilePath = `/uploads/${newFilename}`; // Mise à jour du chemin du fichier
//       return savedFilePath;
//     };
//   }

//   const form = formidable(options);
//   return new Promise((resolve, reject) => {
//     form.parse(req, (err, fields, files) => {
//       if (err) return reject(err);
//       resolve({ fields, files });
//     });
//   });
// };

// export const handler: NextApiHandler = async (req, res) => {
//   if (req.method !== "POST") {
//     // Si la méthode n'est pas POST, renvoyer une erreur 405
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }

//   try {
//     await fs.readdir(path.join(process.cwd(), "/public", "/uploads"));
//   } catch (err) {
//     console.error(err);
//     await fs.mkdir(path.join(process.cwd(), "/public", "/uploads"));
//   }

//   // const savedFilePath = req.body.fields.savedFilePath;

//   const { savedFilePath } = await readFile(req, true);

//   res.json({ message: "File uploaded", path: savedFilePath });
// };
