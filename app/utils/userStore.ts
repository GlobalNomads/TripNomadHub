import create from "zustand";

interface UserState {
  avatarImageUrl?: string;
  setAvatarImageUrl: (url: string) => void;
}

export const useUserStore = create<UserState>(set => ({
  avatarImageUrl: undefined,
  setAvatarImageUrl: url => set({ avatarImageUrl: url }),
}));
