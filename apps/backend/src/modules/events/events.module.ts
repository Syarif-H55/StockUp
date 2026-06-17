import { Module } from '@nestjs/common';
import { NotificationsModule } from '../notifications/notifications.module';
import { EmailModule } from '../email/email.module';
import { RfqModule } from '../rfq/rfq.module';
import { NotificationEventListener } from './notification-listener.event';

@Module({
  imports: [NotificationsModule, EmailModule, RfqModule],
  providers: [NotificationEventListener],
})
export class EventsModule {}

