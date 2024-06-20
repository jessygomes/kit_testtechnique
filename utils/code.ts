// const onSubmit = async (data: FieldValues) => {
//   console.log(data);
//   console.log("IMG_URL", file);

//   setFile(data.imageUrl[0]);
//   if (data.imageUrl[0]) {
//     const formData = new FormData();
//     formData.append("file", data.imageUrl[0]);

//     const response = await fetch(`/api/upload`, {
//       method: "POST",
//       body: formData,
//     });
//     if (response.ok) {
//       const { imageUrl } = await response.json();
//       console.log("IMG_URL", imageUrl);
//       // Ici, vous pouvez définir l'URL de l'image reçue où vous en avez besoin
//       setImageUrl(imageUrl);
//     } else {
//       console.error("Erreur lors de l'upload de l'image");
//     }
//   }
//   // if (file) {
//   //   const url = URL.createObjectURL(file); // Transformation de l'image en URL
//   //   setImageUrl(url);
//   // }
// };
