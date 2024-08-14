"use client";

import getUsersMe from "@/api/Users/getUsersMe";
import patchUsersMe from "@/api/Users/patchUsersMe";
import postUsersMeImg from "@/api/Users/postUsersMeImg";
import Modal from "@/components/Modal/Modal";
import { UserData } from "@/types/users.type";
import Button from "@button/Button";
import Pencil from "@icon/ic_pencil.svg";
import DefalutProfile from "@icon/userProfileIcon.svg";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorText from "./ErrorText";
import Input from "./Input";
import Label from "./Label";

interface PatchUserData {
  nickname: string;
  profileImageUrl: string;
  newPassword: string;
  email?: string;
  passwordConfirmation?: string;
}

function MyProfileFrom() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<PatchUserData>({ mode: "onChange" });

  const { data: userData } = useQuery({
    queryKey: ["getUsersMe"],
    queryFn: () => getUsersMe(),

    enabled: typeof window !== "undefined",
  });

  const disabled = !isValid || isSubmitting ? "disabled" : "nomadBlack";
  const UserProfile = userData?.profileImageUrl || DefalutProfile;

  const [preview, setPreview] = useState<string | null>();
  const [formData, setFormData] = useState({});
  const [modalMessage, setModalMessage] = useState("");
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  //이미지 경로 변환 작업
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const responseData = await postUsersMeImg(file);
      if (responseData) {
        setPreview(responseData.profileImageUrl);
        handleChange({
          target: { name: "profileImageUrl", value: responseData.profileImageUrl },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    }
  };

  //이미지 경로 집어넣기 위한 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit: SubmitHandler<PatchUserData> = async ({ nickname, profileImageUrl, newPassword }) => {
    try {
      const data = { nickname, profileImageUrl, newPassword };
      setFormData(data);

      const returnData = useQuery<UserData>({
        queryKey: ["patchUsersMe"],
        queryFn: () => patchUsersMe(formData),
        staleTime: 60000,
        retry: 2,
      });

      if (returnData) {
        setModalMessage("수정이 완료되었습니다.");
      }
    } catch (error: any) {
      setModalMessage(error?.message);
    }
    setConfirmModalOpen(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div className="text-3xl-bold">내 정보</div>
            <Button.Login type={disabled} className="w-full max-w-[120px] py-[10.5px]">
              저장하기
            </Button.Login>
          </div>

          <div className="grid gap-6">
            <Label htmlFor="profileImage" className="grid w-[140px] gap-[10px] text-2xl-bold">
              프로필 이미지
              <div className="relative h-[140px] w-[140px] object-cover">
                <Image
                  className="rounded-full border-[1px] border-solid border-primary-gray-600"
                  width={140}
                  height={140}
                  src={preview || UserProfile}
                  alt="프로필 이미지"
                />
                <Input
                  type="file"
                  accept="image/*"
                  id="profileImage"
                  name="profileImage"
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
                validationCheck={!!errors.nickname}
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
                validationCheck={!!errors.newPassword}
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
                validationCheck={!!errors.passwordConfirmation}
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

export default MyProfileFrom;
