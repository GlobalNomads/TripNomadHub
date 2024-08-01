/*
  TODO: MockData, API 연결 후 삭제
 */

export const activityData = {
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

export const reviewData = {
  averageRating: 4.8,
  totalCount: 50,
  reviews: [
    {
      id: 1,
      user: {
        profileImageUrl:
          "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/profile_image/6-11_694_1722403560402.png",
        nickname: "백두산날다람쥐",
        id: 694,
      },
      activityId: 1932,
      rating: 4.5,
      content:
        "저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운 시간을 보냈습니다. 전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었고, 강사님의 친절한 설명 덕분에 저는 새로운 스타일과 춤추기에 대한 열정이 더욱 생겼습니다.",
      createdAt: "2024-07-31T05:21:54.022Z",
      updatedAt: "2024-07-31T05:21:54.022Z",
    },
    {
      id: 2,
      user: {
        profileImageUrl:
          "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/6-11_694_1721994832772.jpeg",
        nickname: "박하늘별님구름햇님보다사랑스러우리",
        id: 695,
      },
      activityId: 1932,
      rating: 4.8,
      content:
        "저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운 시간을 보냈습니다. 새로운 스타일과 춤추기를 좋아하는 나에게 정말 적합한 체험이었고, 전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 강사님께서 정말 친절하게 설명해주셔서 정말 좋았고, 이번 체험을 거쳐 새로운 스타일과 춤추기에 대한 열정이 더욱 생겼습니다. 저는 이 체험을 적극 추천합니다!",
      createdAt: "2024-07-31T05:22:54.022Z",
      updatedAt: "2024-07-31T05:22:54.022Z",
    },
    {
      id: 3,
      user: {
        profileImageUrl:
          "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/6-11_694_1721994813442.png",
        nickname: "프라이인드로스테쭈젠댄마리소피아수인레나테엘리자벳피아루이제",
        id: 696,
      },
      activityId: 1932,
      rating: 4.7,
      content:
        "전문가(곽철 강사님)가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 이번 체험을 거쳐 저의 춤추기 실력은 더욱 향상되었어요.",
      createdAt: "2024-07-31T05:23:54.022Z",
      updatedAt: "2024-07-31T05:23:54.022Z",
    },
    {
      id: 4,
      user: {
        profileImageUrl:
          "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/profile_image/6-11_694_1722403560402.png",
        nickname: "이안나",
        id: 697,
      },
      activityId: 1932,
      rating: 4.6,
      content: "조금 비싼 감은 있었지만, 그만큼 값어치를 하는 체험이었습니다. 다음에 또 참가하고 싶습니다.",
      createdAt: "2024-07-31T05:24:54.022Z",
      updatedAt: "2024-07-31T05:24:54.022Z",
    },
    {
      id: 5,
      user: {
        profileImageUrl:
          "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/profile_image/6-11_694_1722403560402.png",
        nickname: "Rihanna",
        id: 698,
      },
      activityId: 1932,
      rating: 4.9,
      content:
        "춤추기를 좋아하는 사람에게 꼭 추천하고 싶은 체험입니다. 많은 것을 배울 수 있었고, 재미있는 시간이었습니다. 정말 재미있었고, 강사님도 너무 친절하셨습니다. 새로운 스타일의 춤을 배울 수 있어서 좋았습니다.",
      createdAt: "2024-07-31T05:25:54.022Z",
      updatedAt: "2024-07-31T05:25:54.022Z",
    },
    {
      id: 6,
      user: {
        profileImageUrl:
          "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/profile_image/6-11_694_1722403560402.png",
        nickname: "Gary Oldman",
        id: 699,
      },
      activityId: 1932,
      rating: 4.5,
      content: "너무 즐거운 시간이었어요. 강사님이 친절하고 전문적이셔서 좋았어요.",
      createdAt: "2024-07-31T05:26:54.022Z",
      updatedAt: "2024-07-31T05:26:54.022Z",
    },
    {
      id: 7,
      user: {
        profileImageUrl:
          "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/profile_image/6-11_694_1722403560402.png",
        nickname: "장원형",
        id: 700,
      },
      activityId: 1932,
      rating: 4.7,
      content: "새로운 친구들과 춤을 추며 즐거운 시간을 보냈습니다.",
      createdAt: "2024-07-31T05:27:54.022Z",
      updatedAt: "2024-07-31T05:27:54.022Z",
    },
    {
      id: 8,
      user: {
        profileImageUrl:
          "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/profile_image/6-11_694_1722403560402.png",
        nickname: "칼이나",
        id: 701,
      },
      activityId: 1932,
      rating: 4.6,
      content: "다양한 스타일의 춤을 배울 수 있어서 좋았습니다.",
      createdAt: "2024-07-31T05:28:54.022Z",
      updatedAt: "2024-07-31T05:28:54.022Z",
    },
    {
      id: 9,
      user: {
        profileImageUrl:
          "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/profile_image/6-11_694_1722403560402.png",
        nickname: "누룽지",
        id: 702,
      },
      activityId: 1932,
      rating: 4.8,
      content: "정말 멋진 경험이었습니다. 강사님이 정말 친절하고 잘 가르쳐주셔서 좋았어요.",
      createdAt: "2024-07-31T05:29:54.022Z",
      updatedAt: "2024-07-31T05:29:54.022Z",
    },
    {
      id: 10,
      user: {
        profileImageUrl:
          "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/profile_image/6-11_694_1722403560402.png",
        nickname: "곽철이는귀염둥이",
        id: 703,
      },
      activityId: 1932,
      rating: 4.9,
      content: "정말 좋은 시간이었습니다. 강사님이 친절하시고 재미있었어요.",
      createdAt: "2024-07-31T05:30:54.022Z",
      updatedAt: "2024-07-31T05:30:54.022Z",
    },
  ],
};
