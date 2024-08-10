/*
  미팅포인트(ActivityLocation)의 서버 컴포넌트
*/

import dynamic from "next/dynamic";

interface ActivityLocationServerProps {
  address: string;
}

// 서버 측 렌더링을 비활성화하고, 클라이언트 측에서만 로드되도록 설정하여
// ActivityLocationClient 컴포넌트를 동적으로 가져옴.
const ActivityLocationClient = dynamic(() => import("./ActivityLocationClient"), {
  ssr: false, // 서버사이드 렌더링에서 제외 (클라이언트 사이드에서만 로드)
});

export default function ActivityLocationServer({ address }: ActivityLocationServerProps) {
  // ActivityLocationClient 컴포넌트를 렌더링하고, address 프로퍼티를 전달.
  return <ActivityLocationClient address={address} />;
}
