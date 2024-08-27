"use client";

import getUsersMe from "@/api/Users/getUsersMe";
import patchUsersMe from "@/api/Users/patchUsersMe";
import postUsersMeImg from "@/api/Users/postUsersMeImg";
import { useUserStore } from "@/utils/userStore";
import Button from "@button/Button";
import DefalutProfile from "@icon/ic_default_reviewprofile.png";
import Pencil from "@icon/ic_pencil.svg";
import Modal from "@modal/Modal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorText from "./ErrorText";
import Input from "./Input";
import Label from "./Label";

interface PatchUserData {
  nickname?: string;
  profileImageUrl?: string;
  newPassword?: string;
  email?: string;
  passwordConfirmation?: string;
}

function MyProfileForm() {
  const { setAvatarImageUrl } = useUserStore();
  const queryClient = useQueryClient();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<PatchUserData>({ mode: "onChange" });

  const { data: userData } = useQuery({
    queryKey: ["getUsersMe"],
    queryFn: getUsersMe,
    staleTime: 60000,
    retry: 2,
  });

  const [preview, setPreview] = useState(userData?.profileImageUrl ?? DefalutProfile.src);
  const [modalMessage, setModalMessage] = useState("");
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [formData, setFormData] = useState<PatchUserData>({
    nickname: userData?.nickname,
    profileImageUrl: userData?.profileImageUrl || undefined,
    newPassword: "",
  });

  const UserProfile = preview || DefalutProfile.src;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // 이미지 경로 변환 작업
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const responseData = await postUsersMeImg(file);
      if (responseData) {
        setPreview(responseData.profileImageUrl);
        // 직접 formState 업데이트
        handleChange({
          target: { name: "profileImageUrl", value: responseData.profileImageUrl },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    }
  };

  const onSubmit: SubmitHandler<PatchUserData> = async data => {
    const changes: PatchUserData = {};

    // 변경된 필드만 추출
    if (data.nickname !== userData?.nickname) {
      changes.nickname = data.nickname;
    }
    if (data.newPassword) {
      changes.newPassword = data.newPassword;
    }
    if (formData.profileImageUrl && formData.profileImageUrl !== userData?.profileImageUrl) {
      changes.profileImageUrl = formData.profileImageUrl; // 변경된 이미지 URL만 추가
    }

    try {
      if (Object.keys(changes).length > 0) {
        // 변경된 사항이 있을 경우에만 API 호출
        const response = await patchUsersMe(changes);
        setModalMessage("수정이 성공적으로 완료되었습니다!");
        queryClient.invalidateQueries({ queryKey: ["getUsersMe"] });
        if (response && formData.profileImageUrl) {
          setAvatarImageUrl(formData.profileImageUrl);
        }
      } else {
        setModalMessage("변경된 사항이 없습니다.");
      }
    } catch (error: any) {
      const errorMessage = JSON.parse(error.message);
      setModalMessage(`수정 실패😨: ${errorMessage.message}`);
    }

    setConfirmModalOpen(true);
  };

  useEffect(() => {
    if (userData?.profileImageUrl) {
      setPreview(userData.profileImageUrl);
    }
  }, [userData]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div className="text-3xl-bold">내 정보</div>
            <Button.Submit className="w-full max-w-[120px] py-[10.5px]">저장하기</Button.Submit>
          </div>

          <div className="grid gap-6">
            <Label htmlFor="profileImageUrl" className="grid w-[140px] gap-[10px] text-2xl-bold">
              프로필 이미지
              <div className="relative h-[140px] w-[140px] object-cover">
                <Image
                  className="rounded-full border-[1px] border-solid border-primary-gray-600 object-cover"
                  fill
                  sizes="140"
                  src={UserProfile}
                  alt="프로필 이미지"
                />
                <Input
                  type="file"
                  accept="image/*"
                  id="profileImageUrl"
                  name="profileImageUrl"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <Image
                  className="absolute left-[75%] top-[60%] rounded-full"
                  width={40}
                  height={40}
                  src={Pencil}
                  alt="프로필 편집 아이콘"
                />
              </div>
            </Label>

            <div className="grid gap-[10px]">
              <Label htmlFor="nickname">닉네임</Label>
              <Input
                type="text"
                id="nickname"
                defaultValue={userData?.nickname}
                {...register("nickname", {
                  required: true,
                  maxLength: {
                    value: 10,
                    message: "열 자 이하로 작성해주세요.",
                  },
                })}
              />
              {errors.nickname?.message && <ErrorText>{errors.nickname?.message}</ErrorText>}
            </div>

            {/* 이메일은 변경불가능 값이므로 제한 처리 */}
            <div className="grid gap-[10px]">
              <Label htmlFor="email">이메일</Label>
              <Input type="text" id="email" disabledCheck={true} defaultValue={userData?.email} disabled />
            </div>

            <div className="grid gap-[10px]">
              <Label htmlFor="newPassword">비밀번호</Label>
              <Input
                type="password"
                id="newPassword"
                placeholder="8자 이상 입력해 주세요"
                {...register("newPassword", {
                  required: true,
                  minLength: {
                    value: 8,
                    message: "8자 이상 입력해 주세요",
                  },
                })}
              />
              {errors.newPassword && <ErrorText>{errors.newPassword?.message}</ErrorText>}
            </div>
            <div className="grid gap-[10px]">
              <Label htmlFor="passwordConfirmation">비밀번호 재입력</Label>
              <Input
                type="password"
                id="passwordConfirmation"
                placeholder="비밀번호를 한번 더 입력해 주십시요"
                {...register("passwordConfirmation", {
                  required: true,
                  minLength: {
                    value: 8,
                    message: "8자 이상 입력해 주세요",
                  },
                  validate: value => (value === watch("newPassword") ? true : "비밀번호가 일치하지 않습니다."),
                })}
              />
              {errors.passwordConfirmation && <ErrorText>{errors.passwordConfirmation?.message}</ErrorText>}
            </div>
          </div>
        </div>
      </form>

      <Modal.Confirm
        isOpen={isConfirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={() => {
          setConfirmModalOpen(false);
        }}
        message={modalMessage}
      />
    </>
  );
}

export default MyProfileForm;
