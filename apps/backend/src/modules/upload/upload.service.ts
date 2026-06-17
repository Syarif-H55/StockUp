import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
import { MAX_FILE_SIZE_DOCUMENT, MAX_FILE_SIZE_IMAGE, ALLOWED_DOCUMENT_TYPES, ALLOWED_IMAGE_TYPES } from '@stockup/shared';

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadDocument(file: Express.Multer.File): Promise<string> {
    if (!ALLOWED_DOCUMENT_TYPES.includes(file.mimetype)) {
      throw new BadRequestException('Tipe file tidak diizinkan. Gunakan PDF, JPEG, atau PNG.');
    }
    if (file.size > MAX_FILE_SIZE_DOCUMENT) {
      throw new BadRequestException('Ukuran file maksimal 5MB');
    }
    return this.uploadToCloudinary(file, 'stockup/documents');
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    if (!ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
      throw new BadRequestException('Tipe file tidak diizinkan. Gunakan JPEG, PNG, atau WebP.');
    }
    if (file.size > MAX_FILE_SIZE_IMAGE) {
      throw new BadRequestException('Ukuran file maksimal 2MB');
    }
    return this.uploadToCloudinary(file, 'stockup/images');
  }

  private uploadToCloudinary(file: Express.Multer.File, folder: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder, resource_type: 'auto' },
        (error, result) => {
          if (error || !result) reject(new BadRequestException('Gagal mengupload file'));
          else resolve(result.secure_url);
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async deleteFile(publicId: string) {
    return cloudinary.uploader.destroy(publicId);
  }
}
