"use client";

import Button from "@button/Button";
import { useForm } from "react-hook-form";
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

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i; //이메일 방식 선언

function SigninForm() {
  const {
    register,
    formState: { isSubmitting, errors, isValid },
  } = useForm<PatchUserData>({ mode: "onChange" });

  const disabled = !isValid || isSubmitting ? "disabled" : "nomadBlack";

  return (
    <form>
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <div className="text-3xl-bold">내 정보</div>
          <Button.Login type={disabled} className="w-full max-w-[120px] py-[10.5px]">
            저장하기
          </Button.Login>
        </div>

        <div className="grid gap-6">
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
            {errors.nickname?.message && <ErrorText>{errors.nickname?.message}</ErrorText>}
          </div>

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
            <Label htmlFor="password">비밀번호</Label>
            <Input
              type="password"
              id="password"
              placeholder="비밀번호를 입력해 주세요"
              {...register("newPassword", {
                required: "8자 이상 작성해 주세요",
                minLength: {
                  value: 8,
                  message: "8자 이상 작성해 주세요",
                },
              })}
              validationCheck={!!errors.newPassword}
            />
            {errors.newPassword && <ErrorText>{errors.newPassword?.message}</ErrorText>}
          </div>
          <div className="grid gap-[10px]">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              type="password"
              id="password"
              placeholder="비밀번호를 입력해 주세요"
              {...register("passwordConfirmation", {
                required: "8자 이상 작성해 주세요",
                minLength: {
                  value: 8,
                  message: "8자 이상 작성해 주세요",
                },
              })}
              validationCheck={!!errors.passwordConfirmation}
            />
            {errors.passwordConfirmation && <ErrorText>{errors.passwordConfirmation?.message}</ErrorText>}
          </div>
        </div>
      </div>
    </form>
  );
}

export default SigninForm;
