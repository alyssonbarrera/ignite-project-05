import { Notification } from '../../enterprise/entities/notification'

export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>
  abstract findById(string: string): Promise<Notification | null>
  abstract save(notification: Notification): Promise<void>
}
