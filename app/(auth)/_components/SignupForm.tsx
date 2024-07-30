"use client";

import Button from "@/components/Button/Button";
import { useForm } from "react-hook-form";
import ErrorText from "./ErrorText";
import Input from "./Input";
import Label from "./Label";

interface ISignUpValue {
  email: string;
  password: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i; //이메일 방식 선언

function SigninForm() {
  const {
    register,
    setError,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<ISignUpValue>({ mode: "onChange" });

  return (
    <form>
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
            placeholder="비밀번호를 입력해 주세요"
            {...register("password", {
              required: "열 자 이하로 작성해주세요.",
              maxLength: {
                value: 10,
                message: "열 자 이하로 작성해주세요.",
              },
            })}
            validationCheck={!!errors.password}
          />
          {errors.password && <ErrorText>{errors.password?.message}</ErrorText>}
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
      </div>
      <Button.Login type="nomadBlack" className="mt-6 w-full max-w-[640px] py-[10.5px]">
        로그인
      </Button.Login>
    </form>
  );
}

export default SigninForm;
