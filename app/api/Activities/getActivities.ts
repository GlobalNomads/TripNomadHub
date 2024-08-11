"use server";

import { ActivitiesData } from "@/types/activities.type";
import fetchInstance from "@/utils/fetchInstance";

const getActivities = async (options?: {
  method?: "offset" | "cursor";
  cursorId?: number;
  category?: "문화 · 예술" | "식음료" | "스포츠" | "투어" | "관광" | "웰빙";
  keyword?: string;
  sort?: "most_reviewed" | "price_asc" | "price_desc" | "latest";
  page?: number;
  size?: number;
}) => {
  try {
    const data = await fetchInstance<ActivitiesData>("activities", {
      method: "GET",
      params: options,
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "activities data failed");
    } else {
      throw new Error("activities data failed");
    }
  }
};

export default getActivities;
