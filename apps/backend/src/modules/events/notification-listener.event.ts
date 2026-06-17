import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationsService } from '../notifications/notifications.service';
import { EmailService } from '../email/email.service';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Injectable()
export class NotificationEventListener {
  private readonly logger = new Logger(NotificationEventListener.name);

  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly emailService: EmailService,
    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  @OnEvent('quotation.submitted')
  async handleQuotationSubmitted(payload: {
    buyerUserId: string;
    buyerEmail: string;
    buyerBusinessName: string;
    rfqId: string;
    rfqTitle: string;
    supplierBusinessName: string;
  }) {
    try {
      const notification = await this.notificationsService.create({
        recipientId: payload.buyerUserId,
        type: 'QUOTATION',
        title: 'Quotation Baru Diterima',
        message: `Supplier ${payload.supplierBusinessName} telah mengirim quotation untuk RFQ "${payload.rfqTitle}".`,
        referenceId: payload.rfqId,
        referenceType: 'RFQ',
      });
      this.notificationsGateway.sendNotification(payload.buyerUserId, notification);
      await this.emailService.sendNewQuotationAlert(
        payload.buyerEmail,
        payload.buyerBusinessName,
        payload.rfqTitle,
      );
    } catch (error) {
      this.logger.error('Failed to handle quotation.submitted event:', error);
    }
  }

  @OnEvent('rfq.created')
  async handleRfqCreated(payload: {
    rfqId: string;
    rfqTitle: string;
    supplierUserIds: { id: string; email: string; businessName: string }[];
  }) {
    try {
      for (const supplier of payload.supplierUserIds) {
        const notification = await this.notificationsService.create({
          recipientId: supplier.id,
          type: 'RFQ',
          title: 'RFQ Baru Tersedia',
          message: `RFQ "${payload.rfqTitle}" baru tersedia dan sesuai dengan kategori usaha Anda.`,
          referenceId: payload.rfqId,
          referenceType: 'RFQ',
        });
        this.notificationsGateway.sendNotification(supplier.id, notification);
        await this.emailService.sendNewRfqAlert(
          supplier.email,
          supplier.businessName,
          payload.rfqTitle,
        );
      }
    } catch (error) {
      this.logger.error('Failed to handle rfq.created event:', error);
    }
  }

  @OnEvent('user.registered')
  async handleUserRegistered(payload: {
    userId: string;
    email: string;
    fullName: string;
    emailVerifyToken: string;
  }) {
    try {
      await this.emailService.sendEmailVerification(payload.email, payload.fullName, payload.emailVerifyToken);
    } catch (error) {
      this.logger.error('Failed to handle user.registered event:', error);
    }
  }

  @OnEvent('verification.approved')
  async handleVerificationApproved(payload: {
    supplierUserId: string;
    email: string;
    businessName: string;
  }) {
    try {
      const notification = await this.notificationsService.create({
        recipientId: payload.supplierUserId,
        type: 'VERIFICATION',
        title: 'Verifikasi Disetujui',
        message: `Selamat! Verifikasi akun supplier "${payload.businessName}" telah disetujui. Sekarang Anda dapat menerima RFQ dan mengirim quotation.`,
        referenceType: 'VERIFICATION',
      });
      this.notificationsGateway.sendNotification(payload.supplierUserId, notification);
      await this.emailService.sendVerificationApproved(payload.email, payload.businessName);
    } catch (error) {
      this.logger.error('Failed to handle verification.approved event:', error);
    }
  }

  @OnEvent('verification.rejected')
  async handleVerificationRejected(payload: {
    supplierUserId: string;
    email: string;
    businessName: string;
    reason?: string;
  }) {
    try {
      const notification = await this.notificationsService.create({
        recipientId: payload.supplierUserId,
        type: 'VERIFICATION',
        title: 'Verifikasi Ditolak',
        message: `Verifikasi akun supplier "${payload.businessName}" ditolak.${payload.reason ? ` Alasan: ${payload.reason}` : ''} Silakan lengkapi data dan ajukan kembali.`,
        referenceType: 'VERIFICATION',
      });
      this.notificationsGateway.sendNotification(payload.supplierUserId, notification);
      await this.emailService.sendVerificationRejected(payload.email, payload.businessName, payload.reason);
    } catch (error) {
      this.logger.error('Failed to handle verification.rejected event:', error);
    }
  }
}
