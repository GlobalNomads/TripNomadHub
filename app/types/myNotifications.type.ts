export interface NotificationList {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface NotificationsData {
  cursorId: number;
  notifications: NotificationList[];
  totalCount: number;
}
