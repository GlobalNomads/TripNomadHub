/*
  미팅포인트(ActivityLocation)의 서버 컴포넌트
*/

import ActivityLocationClient from "./ActivityLocationClient";

interface ActivityLocationServerProps {
  address: string;
}

export default function ActivityLocationServer({ address }: ActivityLocationServerProps) {
  // 서버 컴포넌트는 주소만 준비하고 클라이언트 컴포넌트를 호출
  return <ActivityLocationClient address={address} />;
}
