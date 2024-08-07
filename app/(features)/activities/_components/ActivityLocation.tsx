/*
    체험 장소(ActivityLocation): 카카오 지도 이용해 구현
*/
"use client";

import React, { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface ActivityLocationProps {
  address: string;
}

const ActivityLocation: React.FC<ActivityLocationProps> = ({ address }) => {
  useEffect(() => {
    const initializeMap = () => {
      if (window.kakao && window.kakao.maps) {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        // 주소-좌표 변환 서비스 사용
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, function (result: any, status: any) {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            const marker = new window.kakao.maps.Marker({
              map: map,
              position: coords,
            });
            map.setCenter(coords);
          } else {
            console.error("Geocode was not successful for the following reason: " + status);
          }
        });
      }
    };

    const loadScript = () => {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}&libraries=services,clusterer&autoload=false`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        window.kakao.maps.load(() => {
          initializeMap();
        });
      };
      document.head.appendChild(script);
    };

    if (!window.kakao || !window.kakao.maps) {
      loadScript();
    } else {
      initializeMap();
    }
  }, [address]);

  return (
    <div className="flex justify-between text-xl-bold text-primary-black-100">
      <h3>미팅 포인트</h3>
      <div id="map" style={{ width: "500px", height: "400px" }}></div>
    </div>
  );
};

export default ActivityLocation;
