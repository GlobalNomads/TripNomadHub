"use client";

import postOauthSignin, { OauthInput } from "@/api/Oauth/postOauthSignin";
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

function SimpleSignin() {
  // Google 로그인 처리
  const googleSignInMutation = useMutation({
    mutationFn: () => postOauthSignin("google", oauthGoogleInput),
    onSuccess: data => {
      console.log("Google login successful:", data);
    },
    onError: error => {
      console.error("Google login error:", error);
    },
  });

  // Kakao 로그인 처리
  const kakaoSignInMutation = useMutation({
    mutationFn: () => postOauthSignin("kakao", oauthKakaoInput),
    onSuccess: data => {
      console.log("Kakao login successful:", data);
    },
    onError: error => {
      console.error("Kakao login error:", error);
    },
  });
  return (
    <div className="flex items-center justify-center gap-5">
      <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-[1px] border-solid border-primary-gray-300">
        <Image
          src={GoogleIcon}
          alt="간편 로그인 구글"
          className="cursor-pointer"
          onClick={() => googleSignInMutation.mutate()}
        />
      </div>

      <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-[1px] border-solid border-primary-gray-300">
        <Image
          src={KakaoIcon}
          alt="간편 로그인 카카오"
          className="cursor-pointer"
          onClick={() => kakaoSignInMutation.mutate()}
        />
      </div>
    </div>
  );
}

export default SimpleSignin;
