/**
 * Interface untuk kategori supplier.
 */
export interface ICategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Data untuk membuat kategori baru.
 */
export interface ICreateCategoryRequest {
  name: string;
  description?: string;
}

/**
 * Data untuk update kategori.
 */
export interface IUpdateCategoryRequest {
  name?: string;
  description?: string;
}
