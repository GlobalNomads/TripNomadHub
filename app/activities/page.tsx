/*
  체험 상세 페이지
  Todo: 
    (1)체험 상세, 
    (2)카카오 지도 연결,
    (3)후기 연결,
    (4)예약 관리,
    (5)동적 라우팅 연결하기, 
    (6)MockData 없애고 실제 API와 데이터 연결하기
*/

import React from "react";
import ActivityDescription from "./_components/ActivityDescription";
import ActivityImageGallery from "./_components/ActivityImageGallery";
import ActivityTitle from "./_components/ActivityTitle";
import DropDownMenu from "./_components/DropDownMenu";

const mockData = {
  id: 1932,
  userId: 694,
  title: "함께 하면 즐거운 곽철이와 함께 춤을",
  description:
    "둠칫 둠칫 두둠칫 날이면 날마다 오는 체험이 아니다! 곽철이와 함께 댄스를 출 수 있는 특별한 기회! 특별한 가격에 모십니다! 곽철이와 함께 춤을!! 💃🕺",
  category: "투어",
  price: 1000000,
  address: "서울특별시 강남구 테헤란로 427",
  bannerImageUrl:
    "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/6-11_694_1721994832772.jpeg",
  rating: 4.8,
  reviewCount: 589,
  createdAt: "2024-07-26T13:49:15.140Z",
  updatedAt: "2024-07-26T13:49:15.140Z",
  subImages: [
    {
      id: 2627,
      imageUrl:
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/6-11_694_1721969278121.png",
    },
    {
      id: 2628,
      imageUrl:
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/6-11_694_1721994813442.png",
    },
    {
      id: 2629,
      imageUrl:
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/6-11_694_1721969204805.png",
    },
    {
      id: 2630,
      imageUrl:
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/6-11_694_1721994869821.jpeg",
    },
  ],
  schedules: [
    {
      id: 7349,
      date: "2024-12-01",
      startTime: "12:00",
      endTime: "13:00",
    },
    {
      id: 7350,
      date: "2024-12-05",
      startTime: "12:00",
      endTime: "13:00",
    },
    {
      id: 7351,
      date: "2024-12-05",
      startTime: "13:00",
      endTime: "14:00",
    },
    {
      id: 7352,
      date: "2024-12-05",
      startTime: "14:00",
      endTime: "15:00",
    },
  ],
};

const images = mockData.subImages.map(image => image.imageUrl);

const Activities: React.FC = () => {
  return (
    <div>
      Activities
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <ActivityTitle
            category={mockData.category}
            title={mockData.title}
            rating={mockData.rating}
            reviewCount={mockData.reviewCount}
            location={mockData.address}
          />
        </div>
        <div className="flex-none">
          <DropDownMenu />
        </div>
      </div>
      <ActivityImageGallery bannerImage={mockData.bannerImageUrl} images={images} />
      <ActivityDescription description={mockData.description} />
    </div>
  );
};

export default Activities;
