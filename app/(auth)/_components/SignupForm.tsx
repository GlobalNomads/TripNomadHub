"use client";

import Modal from "@/components/Modal/Modal";
import { UserData } from "@/types/users.type";
import postUsers from "@api/Users/postUsers";
import Button from "@button/Button";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorText from "./ErrorText";
import Input from "./Input";
import Label from "./Label";

interface SignUpValue {
  email: string;
  password: string;
  nickname: string;
  passwordConfirmation?: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i; //이메일 방식 선언

function SigninForm() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<SignUpValue>({ mode: "onChange" });

  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const router = useRouter();
  const disabled = !isValid || isSubmitting ? "disabled" : "nomadBlack";

  const onSubmit: SubmitHandler<SignUpValue> = async ({ email, nickname, password }) => {
    try {
      const responseData = { email, nickname, password };
      const returnData = useQuery<UserData>({
        queryKey: ["users"],
        queryFn: () => postUsers(responseData),
        staleTime: 60000,
        retry: 2,
      });

      if (returnData) {
        setModalMessage("가입이 완료되었습니다.");
      }
    } catch (error: any) {
      setModalMessage(error?.message);
    }
    setConfirmModalOpen(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6">
          <div className="grid gap-[10px]">
            <Label htmlFor="email">이메일</Label>
            <Input
              type="text"
              id="email"
              placeholder="이메일을 입력해 주세요"
              {...register("email", {
                required: "이메일 형식으로 작성해 주세요",
                pattern: {
                  value: EMAIL_REGEX,
                  message: "이메일 형식으로 작성해 주세요",
                },
              })}
              validationCheck={!!errors.email}
            />
            {errors.email?.message && <ErrorText>{errors.email?.message}</ErrorText>}
          </div>
          <div className="grid gap-[10px]">
            <Label htmlFor="nickname">닉네임</Label>
            <Input
              type="text"
              id="nickname"
              placeholder="닉네임을 입력해 주세요"
              {...register("nickname", {
                required: "열 자 이하로 작성해주세요.",
                maxLength: {
                  value: 10,
                  message: "열 자 이하로 작성해주세요.",
                },
              })}
              validationCheck={!!errors.nickname}
            />
            {errors.nickname && <ErrorText>{errors.nickname?.message}</ErrorText>}
          </div>
          <div className="grid gap-[10px]">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              type="password"
              id="password"
              placeholder="비밀번호를 입력해 주세요"
              {...register("password", {
                required: "8자 이상 작성해 주세요",
                minLength: {
                  value: 8,
                  message: "8자 이상 작성해 주세요",
                },
              })}
              validationCheck={!!errors.password}
            />
            {errors.password && <ErrorText>{errors.password?.message}</ErrorText>}
          </div>
          <div className="grid gap-[10px]">
            <Label htmlFor="passwordConfirmation">비밀번호 확인</Label>
            <Input
              type="password"
              id="passwordConfirmation"
              placeholder="비밀번호를 입력해 주세요"
              {...register("passwordConfirmation", {
                required: true,
                validate: value => (value === watch("password") ? true : "비밀번호가 일치하지 않습니다."),
              })}
              validationCheck={!!errors.passwordConfirmation}
            />
            {errors.passwordConfirmation && <ErrorText>{errors.passwordConfirmation?.message}</ErrorText>}
          </div>
        </div>
        <Button.Login type={disabled} className="mt-6 w-full max-w-[640px] py-[10.5px]">
          회원가입
        </Button.Login>
      </form>

      <Modal.Confirm
        isOpen={isConfirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={() => {
          setConfirmModalOpen(false);
          router.push("/signin");
        }}
        message={modalMessage}
      >
        <></>
      </Modal.Confirm>
    </>
  );
}

export default SigninForm;
