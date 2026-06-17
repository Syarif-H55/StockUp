import { PrismaClient, UserRole, AccountStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

/**
 * Database Seeder StockUp.
 *
 * Membuat:
 * 1. Admin account (dari environment variables)
 * 2. Kategori supplier default untuk F&B
 * 3. Badge definitions (Verified Supplier, Verified Pro)
 */
async function main() {
  console.log('🌱 Memulai seeding database StockUp...\n');

  // =====================================================
  // 1. ADMIN ACCOUNT
  // =====================================================
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@stockup.id';
  const adminPassword = process.env.ADMIN_PASSWORD || 'StockUp@Admin2026';
  const adminFullName = process.env.ADMIN_FULL_NAME || 'StockUp Admin';

  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      fullName: adminFullName,
      role: UserRole.ADMIN,
      accountStatus: AccountStatus.ACTIVE,
      emailVerifiedAt: new Date(), // Admin langsung terverifikasi
    },
  });

  console.log(`✅ Admin account: ${admin.email}`);

  // =====================================================
  // 2. KATEGORI SUPPLIER DEFAULT
  // =====================================================
  // Kategori untuk bisnis F&B di Yogyakarta
  const categories = [
    { name: 'Biji Kopi', slug: 'biji-kopi', description: 'Supplier biji kopi mentah dan roasted' },
    { name: 'Susu & Dairy', slug: 'susu-dairy', description: 'Supplier susu segar, UHT, cream, dan produk dairy lainnya' },
    { name: 'Tepung & Baking', slug: 'tepung-baking', description: 'Supplier tepung, ragi, baking powder, dan bahan baking' },
    { name: 'Gula & Pemanis', slug: 'gula-pemanis', description: 'Supplier gula pasir, gula aren, madu, dan pemanis lainnya' },
    { name: 'Sirup & Flavoring', slug: 'sirup-flavoring', description: 'Supplier sirup, essence, dan flavoring untuk minuman' },
    { name: 'Daging & Protein', slug: 'daging-protein', description: 'Supplier daging sapi, ayam, ikan, dan sumber protein lainnya' },
    { name: 'Sayur & Buah', slug: 'sayur-buah', description: 'Supplier sayuran segar, buah-buahan, dan frozen vegetables' },
    { name: 'Bumbu & Rempah', slug: 'bumbu-rempah', description: 'Supplier bumbu masak, rempah-rempah, dan herbs' },
    { name: 'Minyak Goreng', slug: 'minyak-goreng', description: 'Supplier minyak goreng, olive oil, dan cooking oil' },
    { name: 'Kemasan & Packaging', slug: 'kemasan-packaging', description: 'Supplier cup, lid, box, paper bag, dan packaging F&B' },
    { name: 'Es & Frozen', slug: 'es-frozen', description: 'Supplier es batu, frozen food, dan frozen ingredients' },
    { name: 'Teh & Herbal', slug: 'teh-herbal', description: 'Supplier daun teh, teh celup, matcha, dan herbal tea' },
    { name: 'Cokelat & Kakao', slug: 'cokelat-kakao', description: 'Supplier cokelat batang, cocoa powder, dan chocolate compound' },
    { name: 'Peralatan F&B', slug: 'peralatan-fb', description: 'Supplier peralatan dapur, mesin kopi, blender, dan equipment F&B' },
    { name: 'Lainnya', slug: 'lainnya', description: 'Kategori lainnya untuk kebutuhan F&B yang belum terkategorikan' },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  console.log(`✅ ${categories.length} kategori supplier berhasil dibuat`);

  // =====================================================
  // 3. BADGE DEFINITIONS
  // =====================================================
  // v1.0: Badge manual yang diberikan oleh admin/sistem
  // v1.5: Badge otomatis berdasarkan performa supplier
  const badges = [
    {
      name: 'VERIFIED_SUPPLIER',
      displayName: 'Verified Supplier',
      description: 'Supplier yang telah melewati proses verifikasi StockUp',
      icon: '✓',
    },
    {
      name: 'VERIFIED_PRO',
      displayName: 'Verified Pro',
      description: 'Supplier dengan paket Pro yang telah terverifikasi',
      icon: '⭐',
    },
    {
      name: 'TRUSTED_SUPPLIER',
      displayName: 'Trusted Supplier',
      description: 'Supplier terverifikasi dengan reputasi terpercaya (aktif minimal 14 hari)',
      icon: '🛡️',
    },
    {
      name: 'RESPONSIVE_SUPPLIER',
      displayName: 'Responsive Supplier',
      description: 'Supplier yang merespon RFQ dengan cepat (rata-rata ≤ 24 jam, minimal 3 quotation)',
      icon: '⚡',
    },
  ];

  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { name: badge.name },
      update: {},
      create: badge,
    });
  }

  console.log(`✅ ${badges.length} badge definitions berhasil dibuat`);

  console.log('\n🎉 Seeding selesai!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding gagal:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
