import { UserRole, AccountStatus } from '../enums';

/**
 * Interface dasar untuk data user yang dikembalikan API.
 * Tidak termasuk password dan refresh token.
 */
export interface IUser {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  accountStatus: AccountStatus;
  emailVerifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Data yang diperlukan untuk registrasi buyer.
 */
export interface IRegisterBuyerRequest {
  email: string;
  password: string;
  fullName: string;
  businessName: string;
  phoneNumber: string;
  address?: string;
}

/**
 * Data yang diperlukan untuk registrasi supplier.
 */
export interface IRegisterSupplierRequest {
  email: string;
  password: string;
  fullName: string;
  businessName: string;
  businessAddress: string;
  phoneNumber: string;
  description?: string;
}

/**
 * Data login request.
 */
export interface ILoginRequest {
  email: string;
  password: string;
}

/**
 * Response autentikasi yang berisi token.
 */
export interface IAuthResponse {
  user: IUser;
  accessToken: string;
}
