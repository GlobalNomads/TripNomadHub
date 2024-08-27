import React, { useEffect, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import PopularActivity from "./PopularActivity";
import type { ActivityList } from "@/types/activities.type";
import getActivities from "@/api/Activities/getActivities";

const PopularActivities = () => {
  const [popularActivities, setPopularActivities] = useState<ActivityList[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const fetchPopularActivities = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const data = await getActivities({
        method: "offset",
        sort: "most_reviewed",
        size: 30,
        page,
      });

      // Filter out activities that are already in the state to prevent duplicates
      const newActivities = data.activities.filter(
        newActivity => !popularActivities.some(activity => activity.id === newActivity.id),
      );

      setPopularActivities(prev => [...prev, ...newActivities]);
      setTotalCount(data.totalCount);
      setHasMore(popularActivities.length + newActivities.length < data.totalCount);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error("Failed to fetch popular activities:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore, popularActivities]);

  useEffect(() => {
    if (popularActivities.length === 0) {
      fetchPopularActivities();
    }
  }, [fetchPopularActivities, popularActivities.length]);

  return (
    <div className="mt-12 md:mt-12 xl:mt-12">
      <h2 className="mb-8 text-lg-semibold font-semibold text-primary-black-200 md:text-2xl-bold">🔥 인기 체험</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Navigation]}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        onReachEnd={() => {
          if (hasMore) {
            fetchPopularActivities();
          }
        }}
      >
        {popularActivities.map((activity, index) => (
          <SwiperSlide key={`${activity.id}-${index}`}>
            <PopularActivity data={activity} />
          </SwiperSlide>
        ))}
        {loading && (
          <SwiperSlide>
            <div className="flex h-full items-center justify-center"></div>
          </SwiperSlide>
        )}
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </Swiper>
    </div>
  );
};

export default PopularActivities;
