import { VerificationStatus } from '../enums';

/**
 * Interface untuk profil supplier.
 */
export interface ISupplierProfile {
  id: string;
  userId: string;
  businessName: string;
  businessAddress: string;
  phoneNumber: string;
  description: string | null;
  logoUrl: string | null;
  verificationStatus: VerificationStatus;
  categories: ICategoryBasic[];
  badges: ISupplierBadgeBasic[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Interface untuk supplier dalam direktori publik.
 */
export interface ISupplierDirectoryItem {
  id: string;
  businessName: string;
  description: string | null;
  logoUrl: string | null;
  verificationStatus: VerificationStatus;
  categories: ICategoryBasic[];
  badges: ISupplierBadgeBasic[];
}

/**
 * Data untuk update profil supplier.
 */
export interface IUpdateSupplierProfileRequest {
  businessName?: string;
  businessAddress?: string;
  phoneNumber?: string;
  description?: string;
  categoryIds?: string[];
}

/**
 * Interface ringkas untuk kategori (digunakan dalam relasi).
 */
export interface ICategoryBasic {
  id: string;
  name: string;
  slug: string;
}

/**
 * Interface ringkas untuk badge supplier (digunakan dalam relasi).
 */
export interface ISupplierBadgeBasic {
  id: string;
  badgeName: string;
}
