import { NotificationType } from '../enums';

/**
 * Interface untuk notifikasi in-app.
 */
export interface INotification {
  id: string;
  recipientId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  /** ID entitas terkait (RFQ, Quotation, Verification, dll.) */
  referenceId: string | null;
  /** Tipe entitas terkait untuk navigasi */
  referenceType: string | null;
  createdAt: string;
}

/**
 * Response untuk unread count notifikasi.
 */
export interface IUnreadNotificationCount {
  count: number;
}
