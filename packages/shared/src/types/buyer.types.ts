/**
 * Interface untuk profil buyer.
 */
export interface IBuyerProfile {
  id: string;
  userId: string;
  businessName: string;
  phoneNumber: string;
  address: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Data untuk update profil buyer.
 */
export interface IUpdateBuyerProfileRequest {
  businessName?: string;
  phoneNumber?: string;
  address?: string;
}
