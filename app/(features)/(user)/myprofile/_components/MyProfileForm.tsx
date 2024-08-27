"use client";

import getUsersMe from "@/api/Users/getUsersMe";
import patchUsersMe, { patchUserData } from "@/api/Users/patchUsersMe";
import postUsersMeImg from "@/api/Users/postUsersMeImg";
import Button from "@button/Button";
import DefalutProfile from "@icon/ic_default_reviewprofile.png";
import Pencil from "@icon/ic_pencil.svg";
import Modal from "@modal/Modal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

function MyProfileForm() {
  const queryClient = useQueryClient();
  const {
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<PatchUserData>({ mode: "onChange" });

  const { data: userData, refetch } = useQuery({
    queryKey: ["getUsersMe"],
    queryFn: getUsersMe,
    staleTime: 60000,
    retry: 2,
  });

  const { mutate } = useMutation({
    mutationFn: (returnData: patchUserData) => patchUsersMe(returnData),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["getUsersMe"] });
      // 강제로 새로고침하여 최신 데이터로 업데이트
      // await refetch();
      // await queryClient.refetchQueries({ queryKey: ["getUsersMe"] });
      // Inspect the cache using getQueryData
      // const cachedUserData = queryClient.getQueryData(["getUsersMe"]);
      // console.log("Cached user data:", cachedUserData);
      setModalMessage("수정이 완료되었습니다.");
      setConfirmModalOpen(true);
    },
    onError: (error: any) => {
      setModalMessage(error?.message);
      setConfirmModalOpen(true);
    },
  });

  const disabled = !isValid || isSubmitting ? "disabled" : "nomadBlack";
  const UserProfile = userData?.profileImageUrl || DefalutProfile.src;

  const [preview, setPreview] = useState<string | null>(UserProfile);
  const [modalMessage, setModalMessage] = useState("");
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  // 이미지 경로 변환 작업
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const responseData = await postUsersMeImg(file);
      if (responseData) {
        setPreview(responseData.profileImageUrl);
        // 직접 formState 업데이트
        handleSubmit(async data => {
          const updatedData: PatchUserData = {
            ...data,
            profileImageUrl: responseData.profileImageUrl,
          };
          mutate(updatedData);
        })();
      }
    }
  };

  const onSubmit: SubmitHandler<PatchUserData> = async data => {
    console.log({ data });
    mutate({ ...data, profileImageUrl: preview });
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
                  className="rounded-full border-[1px] border-solid border-primary-gray-600 object-cover"
                  fill
                  sizes="140"
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

export default MyProfileForm;
