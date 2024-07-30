"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
// import FetchApi from "./FetchApi";

const ReservationCard = () => {
  const [title, setTitle] = useState("");
  const [bannerImageUrl, setBannerImageUrl] = useState("");

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzEwLCJ0ZWFtSWQiOiI2LTExIiwiaWF0IjoxNzIyMzUwMDcxLCJleHAiOjE3MjM1NTk2NzEsImlzcyI6InNwLWdsb2JhbG5vbWFkIn0.wKKF9ioNjGW0aSF9lXfEBKFlpI5KcRxIYSFFLmXqHNk";

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}my-reservations`;
        const response = await fetch(url, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();
        const title = jsonData.reservations[0].activity.title;
        const bannerImageUrl = jsonData.reservations[0].activity.bannerImageUrl;
        setTitle(title);
        setBannerImageUrl(bannerImageUrl);

        console.log("title:", title);
      } catch (error) {
        console.error("Fetch Card failed", error);
      }
    };
    // const fetchCard = async () => {
    //   try {
    //     const url = "my-reservations";
    //     const response = await FetchApi(url);
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     const jsonData = await response;
    //     setTitle(jsonData.title);

    //     console.log("title:", title);
    //   } catch (error) {
    //     console.error("Fetch card failed:", error);
    //   }
    // };
    fetchCard();
  }, []);

  return (
    <div className="mx-auto flex-row">
      <div className="mb-3 ml-4 mt-6 text-3xl-bold">예약 내역</div>
      <div className="flex h-[128px] w-[344px] rounded-3xl border border-solid border-gray-300 bg-white md:h-[156px] md:w-[429px] xl:h-[204px] xl:w-[792px]">
        <div>
          <Image
            src={bannerImageUrl}
            width={160}
            height={160}
            alt="배너 이미지"
            className="h-[128px] w-[128px] rounded-l-3xl md:h-[156px] md:w-[156px] xl:h-[204px] xl:w-[204px]"
          />
        </div>
        <div className="text-md-bold">{title}</div>
      </div>
    </div>
  );
};
export default ReservationCard;
