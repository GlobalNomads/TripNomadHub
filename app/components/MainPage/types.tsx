export type ErrorMessage = {
  message: string;
};

export type Category = "문화 · 예술" | "식음료" | "스포츠" | "투어" | "관광" | "웰빙";

export type ReservationStatus = "pending" | "confirmed" | "declined" | "canceled" | "completed";

export interface Activites {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: Category;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

