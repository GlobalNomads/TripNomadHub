"use client";

import postOauthSignup, { OauthInput } from "@/api/Oauth/postOauthSignin";
import GoogleIcon from "@icon/ic_google.svg";
import KakaoIcon from "@icon/ic_kakao.svg";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";

const GOOGLE_APP_KEY = process.env.NEXT_PUBLIC_GOOGLE_APP_KEY;
const KAKAO_APP_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;

const oauthGoogleInput: OauthInput = {
  redirectUri: "http://localhost:3000/oauth/google",
  token: `${GOOGLE_APP_KEY}`,
};

const oauthKakaoInput: OauthInput = {
  redirectUri: "http://localhost:3000/oauth/kakao",
  token: `${KAKAO_APP_KEY}`,
};

function SimpleSignup() {
  // Google 회원가입 처리
  const googleSignUpMutation = useMutation({
    mutationFn: () => postOauthSignup("google", oauthGoogleInput),
    onSuccess: data => {
      console.log("Google signup successful:", data);
    },
    onError: error => {
      console.error("Google signup error:", error);
    },
  });

  // Kakao 회원가입 처리
  const kakaoSignUpMutation = useMutation({
    mutationFn: () => postOauthSignup("kakao", oauthKakaoInput),
    onSuccess: data => {
      console.log("Kakao signup successful:", data);
    },
    onError: error => {
      console.error("Kakao signup error:", error);
    },
  });
  return (
    <div className="flex items-center justify-center gap-5">
      <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-[1px] border-solid border-primary-gray-300">
        <Image
          src={GoogleIcon}
          alt="간편 회원가입 구글"
          className="cursor-pointer"
          onClick={() => googleSignUpMutation.mutate()}
        />
      </div>

      <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-[1px] border-solid border-primary-gray-300">
        <Image
          src={KakaoIcon}
          alt="간편 회원가입 카카오"
          className="cursor-pointer"
          onClick={() => kakaoSignUpMutation.mutate()}
        />
      </div>
    </div>
  );
}

export default SimpleSignup;
