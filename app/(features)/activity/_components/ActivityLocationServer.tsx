/*
  체험 장소(ActivityLocation)의 서버 컴포넌트
*/

import LocationMarker from "@icon/ic_location.svg";
import dynamic from "next/dynamic";
import Image from "next/image";

interface ActivityLocationServerProps {
  address: string;
}

// 서버 측 렌더링을 비활성화하고, 클라이언트 측에서만 로드되도록 설정하여
// ActivityLocationClient 컴포넌트를 동적으로 가져옴.
const ActivityLocationClient = dynamic(() => import("./ActivityLocationClient"), {
  ssr: false, // 서버사이드 렌더링에서 제외 (클라이언트 사이드에서만 로드)
});

export default function ActivityLocationServer({ address }: ActivityLocationServerProps) {
  return (
    <div className="space-y-4 text-primary-black-100">
      <h3 className="text-xl-bold">체험 장소</h3>
      {/* 지도는 CSR */}
      <ActivityLocationClient address={address} />
      {/* 주소 정보는 SSR */}
      <div className="flex space-x-2">
        <div style={{ width: "20px", height: "20px", position: "relative" }}>
          <Image src={LocationMarker} alt="Location marker" fill />
        </div>
        <p className="text-md-semibold">{address}</p>
      </div>
    </div>
  );
}
