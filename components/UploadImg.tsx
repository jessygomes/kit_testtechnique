"use client";
import { useCallback, Dispatch, SetStateAction } from "react";

import { useDropzone } from "react-dropzone";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { convertFileToUrl } from "../lib/utils";
import Image from "next/image";

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export function UploadImg({
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      onFieldChange(convertFileToUrl(acceptedFiles[0]));
    },
    [setFiles, onFieldChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  return (
    <div
      {...getRootProps()}
      className="flex-center bg-dark-3 flex pb-4 lg:h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50"
    >
      <input {...getInputProps()} className="cursor-pointer bg-slate-50" />

      {imageUrl ? (
        <div className="flex h-[30%] lg:h-[80%] w-full flex-1 justify-center ">
          <Image
            src={imageUrl}
            alt="image"
            width={200}
            height={200}
            className="h-[6rem] w-[6rem] lg:h-[12rem] lg:w-[12rem] object-contain object-center"
          />
        </div>
      ) : (
        <div className="flex flex-col justify-between pt-2 lg:pt-5 text-grey-500 bg-slate-100 h-[50%] lg:h-[80%] rounded-lg">
          <h3 className="mb-2 mt-2 text-[0.8rem] lg:text-[1rem] text-primaryBlack text-center">
            GLISSER ICI
          </h3>
          <p className="p-medium-12 lg:mb-4 text-[0.8rem] lg:text-[1rem] text-primary text-center">
            SVG, PNG, JPG
          </p>
          <button
            type="button"
            className="w-full p-2 lg:p-4 mb-2 bg-primary rounded-lg text-white text-[0.8rem] lg:text-[1rem] hover:bg-secondary transition-all duration-300 ease-in-out"
          >
            Sélectionner
          </button>
        </div>
      )}
    </div>
  );
}
