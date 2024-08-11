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
      const { profileImageUrl } = await postUsersMeImg(file);

      // Patch the user data with the new image URL
      await patchUsersMe({
        profileImageUrl,
      });

      alert("프로필 사진을 변경합니다.");

      queryClient.invalidateQueries({
        queryKey: ["getUsersMe"],
      });
    } catch (err) {
      setError("Failed to upload image and update profile.");
      console.error(error);
      alert("프로필 사진 변경을 실패했습니다");
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
            disabled={loading}
            className="hidden"
          />
          <Image className="absolute right-14 top-[-45px] xl:right-28" src={Pencil} width={44} height={44} alt="연필" />
        </label>
      </div>
    </div>
  );
};

export default PencilButton;
