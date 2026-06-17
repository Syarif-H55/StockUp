import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private resend: any = null;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    if (apiKey && apiKey !== 're_your_resend_api_key') {
      try {
        const { Resend } = require('resend');
        this.resend = new Resend(apiKey);
      } catch {
        this.logger.warn('Resend package not available, emails disabled');
      }
    } else {
      this.logger.log('Resend API key not configured, emails disabled');
    }
  }

  private async send(params: { to: string; subject: string; html: string }) {
    if (!this.resend) {
      this.logger.log(`[EMAIL DISABLED] To: ${params.to}, Subject: ${params.subject}`);
      return;
    }
    try {
      await this.resend.emails.send({
        from: this.configService.get<string>('EMAIL_FROM', 'noreply@stockup.id'),
        to: params.to,
        subject: params.subject,
        html: params.html,
      });
      this.logger.log(`Email sent to ${params.to}: ${params.subject}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${params.to}:`, error);
    }
  }

  async sendVerificationApproved(email: string, businessName: string) {
    await this.send({
      to: email,
      subject: 'Verifikasi Supplier Disetujui - StockUp',
      html: `
        <h2>Selamat, ${businessName}!</h2>
        <p>Verifikasi akun supplier Anda telah <strong>disetujui</strong>.</p>
        <p>Sekarang Anda dapat menerima RFQ dan mengirim quotation kepada buyer.</p>
        <p>Terima kasih telah bergabung dengan StockUp!</p>
      `,
    });
  }

  async sendVerificationRejected(email: string, businessName: string, reason?: string) {
    await this.send({
      to: email,
      subject: 'Verifikasi Supplier Ditolak - StockUp',
      html: `
        <h2>Informasi Verifikasi</h2>
        <p>Verifikasi akun supplier <strong>${businessName}</strong> telah <strong>ditolak</strong>.</p>
        ${reason ? `<p>Alasan: ${reason}</p>` : ''}
        <p>Silakan lengkapi data verifikasi Anda dan ajukan kembali.</p>
      `,
    });
  }

  async sendNewQuotationAlert(email: string, businessName: string, rfqTitle: string) {
    await this.send({
      to: email,
      subject: 'Quotation Baru Diterima - StockUp',
      html: `
        <h2>Quotation Baru</h2>
        <p>Halo <strong>${businessName}</strong>,</p>
        <p>Anda menerima quotation baru untuk RFQ: <strong>${rfqTitle}</strong>.</p>
        <p>Silakan login ke dashboard Anda untuk melihat dan membandingkan quotation.</p>
      `,
    });
  }

  async sendNewRfqAlert(email: string, businessName: string, rfqTitle: string) {
    await this.send({
      to: email,
      subject: 'RFQ Baru Tersedia - StockUp',
      html: `
        <h2>RFQ Baru</h2>
        <p>Halo <strong>${businessName}</strong>,</p>
        <p>RFQ baru tersedia yang sesuai dengan kategori usaha Anda: <strong>${rfqTitle}</strong>.</p>
        <p>Segera kirim quotation Anda melalui dashboard supplier.</p>
      `,
    });
  }

  async sendEmailVerification(email: string, fullName: string, token: string) {
    const verificationUrl = `${this.configService.get<string>('FRONTEND_URL', 'http://localhost:5173')}/verify-email?token=${token}`;
    await this.send({
      to: email,
      subject: 'Verifikasi Email - StockUp',
      html: `
        <h2>Selamat Datang, ${fullName}!</h2>
        <p>Terima kasih telah mendaftar di StockUp.</p>
        <p>Silakan verifikasi alamat email Anda dengan mengklik tautan berikut:</p>
        <p><a href="${verificationUrl}">${verificationUrl}</a></p>
        <p>Tautan ini berlaku selama 24 jam.</p>
      `,
    });
  }
}
