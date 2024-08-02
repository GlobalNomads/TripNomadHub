"use client";
import Pencil from "@icon/ic_pencil.svg"; // Adjust the import path as needed
import Image from "next/image";
import { useState } from "react";
import updateProfileImageUrl from "../api/patchImage"; // Adjust the import path as needed
import createImageUrl from "../api/postUrl";

export default function PencilButton() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const { imageUrl } = await createImageUrl(file);
      await updateProfileImageUrl(imageUrl);
      setImageUrl(imageUrl);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div>
      <label htmlFor="upload-button" className="cursor-pointer">
        <Image
          className="absolute right-14 top-[140px] xl:right-32"
          width={44}
          height={44}
          priority={true}
          src={Pencil}
          alt="연필"
        />
      </label>
      <input id="upload-button" type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
      {imageUrl && <img src={imageUrl} alt="Profile" />}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
