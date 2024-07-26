import ActivityTitle from "./_components/ActivityTitle";

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
    "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/6-11_694_1721969204805.png",
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

function Activities() {
  return (
    <div>
      Activities
      <ActivityTitle
        category={mockData.category}
        title={mockData.title}
        rating={mockData.rating}
        reviewCount={mockData.reviewCount}
        location={mockData.address}
      />
    </div>
  );
}

export default Activities;
