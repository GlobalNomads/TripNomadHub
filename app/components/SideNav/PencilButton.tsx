"use client";
import patchUsersMe from "@/api/Users/patchUsersMe";
import postUsersMeImg from "@/api/Users/postUsersMeImg";
import Pencil from "@icon/ic_pencil.svg";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

const PencilButton = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      // Upload the image and get the new image URL
      const { profileImageUrl } = await postUsersMeImg(file);

      // Patch the user data with the new image URL
      await patchUsersMe({
        profileImageUrl,
      });

      // Show success alert
      alert("프로필 사진을 변경했습니다.");
      // Invalidate cache for getUsersMe query and refetch data
      queryClient.invalidateQueries({
        queryKey: ["getUsersMe"],
      });
    } catch (err) {
      console.error("Error uploading image:", err);
      setError("Failed to upload image and update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="relative">
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange} // 이미지 선택 후 handleImageChange 호출
            className="hidden"
          />
          <Image className="absolute right-14 top-[-68px] xl:right-28" src={Pencil} width={44} height={44} alt="연필" />
        </label>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
    </div>
  );
};

export default PencilButton;
