	

**PRODUCT REQUIREMENTS DOCUMENT**

# **StockUp**

Smarter Sourcing Discovery Platform for Food Businesses & Beverage.

| Version | v1.3 \- Final Draft |
| :---- | :---- |
| **Date** | 1 June 2026 |
| **Team** | TrustEd Company \- Syarif Hidayatullah, Raifa Aziz |
| **Product Owner** | TrustEd Company |
| **Client / Stakeholder** | Supplier Yogyakarta, Buyer Yogyakarta |
| **Status** | Draft |

**PART 1: PROBLEM, OBJECTIVES & SCOPE**

# **1\.  Problem Statement**

### **1.1  Background & Context**

Bisnis Food & Beverage skala kecil hingga menengah seperti coffee shop, restoran, katering, dan UMKM kuliner memiliki kebutuhan rutin untuk melakukan pengadaan bahan baku, kemasan, dan kebutuhan operasional lainnya dari berbagai supplier. Saat ini proses pencarian supplier, permintaan penawaran harga, dan perbandingan penawaran masih banyak dilakukan secara manual melalui WhatsApp, media sosial, komunitas bisnis, atau relasi pribadi. Proses tersebut sering kali tidak terstruktur, memerlukan komunikasi berulang dengan banyak supplier, serta menyulitkan pemilik usaha untuk membandingkan penawaran secara objektif. Seiring meningkatnya jumlah UMKM dan bisnis F\&B di Indonesia, kebutuhan akan proses sourcing supplier yang lebih efisien, transparan, dan terdokumentasi menjadi semakin penting. 

### **1.2  Problem Statement**

Pemilik dan pengelola bisnis Food & Beverage skala kecil hingga menengah tidak dapat melakukan proses pencarian, evaluasi, dan perbandingan supplier secara efisien karena proses sourcing masih dilakukan secara manual melalui berbagai saluran yang terpisah, yang mengakibatkan tingginya waktu pengadaan, terbatasnya akses terhadap alternatif supplier, dan meningkatnya risiko pengambilan keputusan yang kurang optimal. 

### **1.3  Who is Affected**

**Primary User Group – Buyer (Pemilik dan Pengelola Bisnis F\&B)**   
Pemilik coffee shop, restoran, katering, dan UMKM kuliner membutuhkan supplier yang mampu menyediakan bahan baku dan kebutuhan operasional secara konsisten. Mereka sering menghabiskan banyak waktu untuk mencari supplier baru, meminta penawaran harga dari beberapa supplier, serta membandingkan berbagai penawaran secara manual sebelum mengambil keputusan pengadaan. Mereka sulit menyelesaikan masalah ini sendiri karena informasi supplier tersebar di berbagai platform dan tidak tersedia mekanisme terpusat untuk mengelola proses sourcing. 

**Secondary User Group – Supplier**   
Supplier bahan baku, distributor, dan penyedia kebutuhan operasional F\&B mengalami kesulitan dalam menjangkau calon pelanggan baru secara efektif. Banyak supplier masih bergantung pada jaringan relasi pribadi, promosi media sosial, atau pemasaran manual untuk memperoleh peluang bisnis. Mereka tidak dapat menyelesaikan masalah ini sendiri karena keterbatasan akses terhadap buyer yang sedang aktif mencari supplier. 

**Indirect Stakeholder – Administrator Platform**   
Administrator bertanggung jawab menjaga kualitas data supplier dan kredibilitas platform. Kualitas pengalaman pengguna sangat bergantung pada akurasi data supplier, proses verifikasi, dan aktivitas sourcing yang terjadi di dalam sistem. Administrator tidak dapat mengatasi permasalahan sourcing secara langsung karena keberhasilan platform bergantung pada partisipasi aktif buyer dan supplier. 

# 

# **2\.  Objectives**

### **2.1  Business Objectives**

| \# | Objective | Why it matters | Success indicator |
| :---: | ----- | ----- | ----- |
| **1** | Memvalidasi kebutuhan pasar terhadap platform sourcing dan RFQ untuk bisnis F\&B skala kecil hingga menengah.  | Sebelum mengembangkan fitur yang lebih kompleks, tim perlu memastikan bahwa masalah yang diangkat benar-benar dirasakan oleh target pengguna.  | Minimal 50 supplier terverifikasi dan 25 buyer aktif menggunakan platform dalam 6 bulan pertama setelah peluncuran.  |
| **2** | Meningkatkan efisiensi proses sourcing supplier bagi bisnis F\&B.  | Nilai utama StockUp adalah membantu buyer memperoleh dan membandingkan penawaran supplier secara lebih cepat dibandingkan proses manual.  | Minimal 100 RFQ berhasil dibuat dan rata-rata setiap RFQ menerima minimal 3 quotation.  |
| **3** | Membangun database supplier F\&B yang terverifikasi dan terpercaya.  | Kualitas supplier merupakan faktor utama yang mempengaruhi kepercayaan buyer terhadap platform.  | Minimal 80% supplier yang terdaftar berhasil melalui proses verifikasi.  |
| **4** | Menciptakan ekosistem yang mempertemukan buyer dan supplier secara berkelanjutan.  | Platform hanya akan bernilai apabila kedua sisi marketplace aktif berinteraksi.  | Minimal 70% RFQ mendapatkan setidaknya satu quotation dari supplier.  |
| **5** | Menyiapkan fondasi monetisasi melalui model subscription.  | Model bisnis yang berkelanjutan diperlukan agar platform dapat terus berkembang.  | Tersedianya fitur Supplier Pro dan Buyer Pro yang siap diluncurkan setelah fase validasi pasar selesai.  |
| **6** | Membangun sistem reputasi supplier yang kredibel.  | Buyer membutuhkan indikator kualitas supplier untuk mendukung proses pengambilan keputusan.  | Sistem badge dan reputasi supplier berhasil diterapkan dan digunakan dalam proses evaluasi supplier oleh buyer.  |

### **2.2  User Objectives**

| Actor | What they need to accomplish | What stops them today |
| ----- | ----- | ----- |
| Buyer (Pemilik Coffee Shop, Restoran, Catering, dan UMKM Kuliner)  | Menemukan supplier yang relevan dengan kebutuhan bisnis mereka.  | Informasi supplier tersebar di berbagai platform dan bergantung pada relasi pribadi atau rekomendasi.  |
| Buyer (Pemilik Coffee Shop, Restoran, Catering, dan UMKM Kuliner)  | Menemukan supplier yang relevan dengan kebutuhan bisnis mereka.  | Harus menghubungi supplier satu per satu melalui berbagai saluran komunikasi.  |
| Buyer (Pemilik Coffee Shop, Restoran, Catering, dan UMKM Kuliner)  | Membandingkan penawaran supplier secara objektif sebelum mengambil keputusan.  | Data penawaran tersimpan di berbagai chat, dokumen, atau media yang tidak terstruktur.  |
| Buyer (Pemilik Coffee Shop, Restoran, Catering, dan UMKM Kuliner)  | Memilih supplier yang paling sesuai berdasarkan harga, kualitas, dan reputasi.  | Sulit memperoleh informasi yang cukup untuk mengevaluasi supplier secara menyeluruh.  |
| Supplier  | Menjangkau calon buyer yang sedang aktif mencari supplier.  | Sulit menemukan prospek baru tanpa melakukan pemasaran secara manual.  |
| Supplier  | Mendapatkan peluang bisnis yang relevan dengan kategori usaha mereka.  | RFQ atau kebutuhan buyer tidak terpusat dan sulit ditemukan.  |
| Supplier  | Meningkatkan visibilitas dan kredibilitas usaha mereka.  | Keterbatasan sarana untuk menunjukkan reputasi dan performa bisnis kepada calon buyer.  |
| Administrator Platform  | Menjaga kualitas dan kredibilitas data supplier dalam platform.  | Proses verifikasi dan pemantauan supplier belum terkelola dalam satu sistem terpusat.  |

# 

# **3\.  Success Metrics**

| Metric | Baseline (now) | Target (6 months) | How it is measured |
| ----- | :---: | :---: | ----- |
| Jumlah Supplier Terverifikasi  | 0 Supplier  | 30 Supplier Terverifikasi  | Database Supplier & Log Verifikasi Admin  |
| Jumlah Buyer Terdaftar  | 0 Buyer  | 20 Buyer Terdaftar  | Database User  |
| Jumlah RFQ Dibuat  | 0 RFQ  | 50 RFQ  | Database RFQ  |
| Persentase RFQ yang Mendapat Quotation  | 0%  | ≥ 70% RFQ menerima minimal 1 quotation  | Perbandingan data RFQ dan Quotation  |
| Rata-rata Quotation per RFQ  | 0 | ≥ 3 quotation per RFQ  | Database Quotation  |
| Jumlah Quotation Dikirim Supplier  | 0 Quotation | 150 Quotation  | Database Quotation  |
| Persentase Supplier Aktif  | 0% | ≥ 60% supplier mengirim minimal 1 quotation dalam 30 hari terakhir  | Activity Log Supplier  |
| Persentase Buyer Aktif  | 0% | ≥ 60% buyer membuat minimal 1 RFQ dalam 30 hari terakhir  | Activity Log Buyer  |
| Waktu Rata-rata Respon Supplier terhadap RFQ  | Belum Tersedia | ≤ 24 Jam  | Timestamp RFQ dan Timestamp Quotation  |
| Tingkat Keberhasilan Verifikasi Supplier  | 0% | ≥ 80% supplier yang mendaftar berhasil diverifikasi  | Database Supplier & Log Verifikasi  |
| Jumlah Supplier dengan Badge Reputasi  | 0 Supplier | Minimal 10 Supplier memperoleh badge reputasi  | Database Badge Supplier  |
| Kesiapan Implementasi Model Subscription  | Belum Tersedia | Spesifikasi dan desain fitur Supplier Pro selesai  | Product Roadmap & Sprint Review  |

# 

# **4\.  Scope**

### **4.1  In Scope & Out of Scope (MVP)**

| ✅  IN Scope (MVP) | ❌  OUT of Scope (v1) |
| ----- | ----- |
| **Buyer** | **Product & Catalog**  |
| Registrasi akun buyer | Katalog produk  |
| Login dan logout | Pencarian produk  |
| Manajemen profil buyer | Perbandingan produk  |
| Membuat RFQ (Request for Quotation) | Manajemen inventaris supplier  |
| Mengelola RFQ (edit, tutup, lihat status) |  |
| Melihat daftar quotation yang diterima |  |
| Membandingkan quotation dari beberapa supplier |  |
| Memilih supplier berdasarkan quotation yang diterima  |  |
| **Supplier** | **Communication**  |
| Registrasi akun supplier | Chat langsung buyer dan supplier  |
| Pengajuan verifikasi supplier | Direct messaging  |
| Manajemen profil supplier | Video call  |
| Menentukan kategori usaha supplier | In-app communication  |
| Menerima RFQ sesuai kategori usaha |  |
| Mengirim quotation kepada buyer |  |
| Melihat riwayat quotation yang dikirim  |  |
| **Administrator** | **Transaction & Procurement Execution**  |
| Verifikasi supplier | Payment gateway  |
| Manajemen kategori supplie | Invoice management  |
| Monitoring RFQ | Purchase order management  |
| Monitoring aktivitas supplier | Order management  |
| Monitoring aktivitas buyer  | Order tracking  |
|  | Delivery tracking  |
| **Public Access**  | **Intelligence & Analytics**  |
| Direktori supplier  | Supplier recommendation engine  |
| Pencarian supplier  | Supplier match score  |
| Filter supplier berdasarkan kategori  | Procurement intelligence  |
| Melihat profil supplier  | Price trend analysis  |
|  | Market insight dashboard  |
|  | Advanced analytics  |
| **Reputation System**  | **Subscription & Monetization**  |
| Sistem badge supplier  | Supplier Pro Subscription  |
| Badge Trusted Supplier  | Buyer Pro Subscription  |
| Badge Responsive Supplier  | Featured Supplier  |
| Badge Top Rated Supplier  | Sponsored Listing  |
|  | Payment Subscription Management  |
| **Foundation for Future Monetization**  | **Platform Expansion**  |
| Struktur role Buyer dan Supplier  | Mobile application (Android)  |
| Struktur paket Free dan Premium  | Mobile application (iOS)  |
| Penyimpanan data aktivitas untuk kebutuhan analytics di masa depan  | Multi-supplier selection  |
|  | Multi-branch management  |
|  | Multi-user collaboration  |

### **4.2  Assumptions & Constraints**

List the assumptions your team accepted while defining scope, and any hard constraints (technical, legal, budget, time) that shaped your decisions.

| Type | Description |
| ----- | ----- |
| **Assumption** | Buyer memiliki akses internet dan perangkat yang mendukung penggunaan aplikasi web.  |
| **Assumption** | Supplier bersedia melakukan proses verifikasi untuk meningkatkan kredibilitas profil mereka.  |
| **Assumption** | Sebagian besar proses transaksi dan negosiasi tetap dilakukan di luar platform pada fase awal produk.  |
| **Assumption** | Buyer bersedia menggunakan proses RFQ digital dibandingkan metode manual seperti WhatsApp atau media sosial.  |
| **Assumption** | Supplier akan memilih kategori usaha yang sesuai sehingga RFQ dapat dikirim kepada supplier yang relevan.  |
| **Assumption** | UMKM dan bisnis F\&B skala kecil hingga menengah merupakan segmen pasar awal yang cukup untuk memvalidasi kebutuhan produk.  |
| **Constraint**  | MVP dikembangkan sebagai Responsive Web Application.  |
| **Constraint**  | Fokus operasional awal berada pada bisnis F\&B di wilayah Yogyakarta sebagai pasar validasi pertama.  |
| **Constraint**  | Tim pengembang memiliki sumber daya terbatas sehingga fitur kompleks akan ditunda ke versi berikutnya.  |
| **Constraint**  | Sistem tidak menangani transaksi keuangan antara buyer dan supplier pada versi MVP.  |
| **Constraint**  | Sistem tidak menyediakan layanan logistik atau pengiriman barang pada versi MVP.  |
| **Constraint**  | Pengembangan MVP difokuskan pada validasi kebutuhan pasar sebelum implementasi fitur monetisasi.  |
| **Constraint**  | Data pengguna dan supplier harus dikelola sesuai prinsip perlindungan data pribadi yang berlaku.  |

**PART 2: FUNCTIONAL REQUIREMENTS & WORKFLOWS**

# **5\.  Functional Requirements**

### **5.1  FR Table: Buyer**

| FR ID | Actor | The system shall… | Condition / Trigger | Priority | MoSCoW |
| :---: | :---: | ----- | ----- | :---: | :---: |
| **FR-001** | Buyer  | memungkinkan pengguna membuat akun buyer baru.  | Ketika pengguna mengirim formulir registrasi yang valid.  | Critical  | M |
| **FR-002** | Buyer  | mengautentikasi akun buyer dan memberikan akses ke dashboard buyer.  | Ketika buyer memasukkan kredensial yang valid saat login.  | Critical  | M |
| **FR-003** | Buyer  | memungkinkan buyer keluar dari sistem secara aman.  | Ketika buyer memilih menu logout.  | High  | M |
| **FR-004** | Buyer  | memungkinkan buyer melihat dan memperbarui informasi profil akun.  | Ketika buyer mengakses halaman profil.  | High  | M |
| **FR-005** | Buyer  | memungkinkan buyer membuat RFQ baru.  | Ketika buyer mengisi dan mengirim formulir RFQ.  | Critical  | M |
| **FR-006** | Buyer  | mewajibkan buyer memilih satu kategori supplier pada setiap RFQ.  | Ketika buyer membuat RFQ baru.  | Critical  | M |
| **FR-007** | Buyer  | menyimpan detail RFQ yang dibuat buyer.  | Ketika RFQ berhasil dikirim.  | Critical  | M |
| **FR-008** | Buyer  | mendistribusikan RFQ ke seluruh supplier terverifikasi yang sesuai dengan kategori RFQ.  | Ketika RFQ berhasil dibuat.  | Critical  | M |
| **FR-009** | Buyer  | memungkinkan buyer melihat daftar RFQ yang pernah dibuat.  | Ketika buyer membuka halaman RFQ.  | High  | M |
| **FR-010** | Buyer  | memungkinkan buyer melihat detail RFQ yang dipilih.  | Ketika buyer memilih salah satu RFQ pada daftar RFQ.  | High  | M |
| **FR-011** | Buyer  | memungkinkan buyer mengubah informasi RFQ yang masih berstatus terbuka.  | Ketika buyer memilih aksi edit RFQ.  | High  | M |
| **FR-012** | Buyer  | memungkinkan buyer menutup RFQ sehingga tidak menerima quotation baru.  | Ketika buyer memilih aksi close RFQ.  | High  | M |
| **FR-013** | Buyer  | menampilkan seluruh quotation yang diterima untuk sebuah RFQ.  | Ketika buyer membuka detail RFQ.  | Critical  | M |
| **FR-014** | Buyer  | menampilkan informasi quotation secara terstruktur untuk kebutuhan evaluasi.  | Ketika buyer melihat daftar quotation.  | Critical  | M |
| **FR-015** | Buyer  | memungkinkan buyer membandingkan beberapa quotation dalam satu tampilan.  | Ketika buyer memilih dua atau lebih quotation untuk dibandingkan.  | Critical  | M |
| **FR-016** | Buyer  | memungkinkan buyer melihat profil supplier yang mengirim quotation.  | Ketika buyer memilih supplier pada quotation tertentu.  | High  | M |
| **FR-017** | Buyer  | memungkinkan buyer memilih satu supplier sebagai supplier terpilih untuk RFQ.  | Ketika buyer menentukan quotation yang dipilih.  | Critical  | M |
| **FR-018** | Buyer  | mengubah status RFQ menjadi selesai setelah buyer memilih supplier.  | Ketika supplier dipilih oleh buyer.  | High  | M |
| **FR-019** | Buyer  | menampilkan status RFQ secara real-time.  | Ketika buyer melihat daftar atau detail RFQ.  | Medium  | S |
| **FR-020** | Buyer  | mengirim notifikasi kepada buyer ketika quotation baru diterima.  | Ketika supplier mengirim quotation untuk RFQ buyer.  | Medium  | S |
| **FR-021** | Buyer  | memungkinkan buyer mencari supplier melalui direktori supplier.  | Ketika buyer menggunakan fitur pencarian supplier.  | High  | M |
| **FR-022** | Buyer  | memungkinkan buyer memfilter supplier berdasarkan kategori usaha.  | Ketika buyer menggunakan fitur filter supplier.  | High  | M |
| **FR-023** | Buyer  | menampilkan profil supplier yang tersedia pada direktori supplier.  | Ketika buyer membuka profil supplier.  | High  | M |
| **FR-024** | Buyer  | menampilkan badge reputasi supplier pada profil supplier.  | Ketika buyer melihat profil supplier.  | Medium  | S |
| **FR-025** | Buyer  | membatasi jumlah RFQ yang dapat dibuat oleh akun Buyer Free sesuai kebijakan platform.  | Ketika buyer membuat RFQ baru dan telah mencapai batas penggunaan.  | Low  | W (This Release) |
| **FR-026** | Buyer  | memberikan prioritas distribusi RFQ untuk akun Buyer Pro.  | Ketika Buyer Pro membuat RFQ.  | Low  | W (This Release) |
| **FR-027** | Buyer  | memungkinkan buyer memilih satu atau lebih supplier tertentu sebagai penerima RFQ.  | Ketika buyer membuat RFQ dan menggunakan fitur Select Supplier.  | Low  | W (This Release) |
| **FR-028** | Buyer  | menampilkan rekomendasi supplier berdasarkan kebutuhan RFQ buyer.  | Ketika buyer membuat RFQ baru.  | Low  | W (This Release) |

### **5.2  FR Table : Supplier**

| FR ID | Actor | The system shall… | Condition / Trigger | Priority | MoSCoW |
| :---: | :---: | ----- | ----- | :---: | :---: |
| **FR-029** | Supplier | memungkinkan pengguna membuat akun supplier baru. | Ketika pengguna mengirim formulir registrasi supplier yang valid. | Critical | M |
| **FR-030** | Supplier | mengautentikasi akun supplier dan memberikan akses ke dashboard supplier. | Ketika supplier memasukkan kredensial yang valid saat login. | Critical | M |
| **FR-031** | Supplier | memungkinkan supplier keluar dari sistem secara aman. | Ketika supplier memilih menu logout. | High | M |
| **FR-032** | Supplier | memungkinkan supplier melihat dan memperbarui informasi profil usaha. | Ketika supplier mengakses halaman profil supplier. | Critical | M |
| **FR-033** | Supplier | memungkinkan supplier mengajukan verifikasi akun supplier. | Ketika supplier melengkapi data verifikasi dan mengirim pengajuan. | Critical | M |
| **FR-034** | Supplier | menyimpan status verifikasi supplier. | Ketika admin menyetujui atau menolak pengajuan verifikasi. | Critical | M |
| **FR-035** | Supplier | menampilkan status verifikasi supplier pada dashboard supplier. | Ketika supplier membuka dashboard atau halaman profil. | High | M |
| **FR-036** | Supplier | memungkinkan supplier memilih satu atau lebih kategori usaha yang relevan. | Ketika supplier membuat atau memperbarui profil usaha. | Critical | M |
| **FR-037** | Supplier | menampilkan RFQ yang sesuai dengan kategori usaha supplier. | Ketika supplier membuka halaman RFQ. | Critical | M |
| **FR-038** | Supplier | hanya menampilkan RFQ kepada supplier yang telah terverifikasi. | Ketika sistem mendistribusikan RFQ. | Critical | M |
| **FR-039** | Supplier | menampilkan jumlah supplier yang menerima RFQ. | Ketika supplier melihat detail RFQ. | Medium | S |
| **FR-040** | Supplier | tidak menampilkan identitas supplier lain yang menerima RFQ yang sama. | Ketika supplier melihat detail RFQ. | Critical | M |
| **FR-041** | Supplier | memungkinkan supplier melihat detail RFQ. | Ketika supplier memilih salah satu RFQ pada daftar RFQ. | Critical | M |
| **FR-042** | Supplier | memungkinkan supplier mengirim quotation untuk RFQ yang tersedia. | Ketika supplier mengisi dan mengirim formulir quotation. | Critical | M |
| **FR-043** | Supplier | menyimpan quotation yang dikirim supplier. | Ketika quotation berhasil dikirim. | Critical | M |
| **FR-044** | Supplier | mencegah supplier mengirim lebih dari satu quotation untuk RFQ yang sama. | Ketika supplier mencoba mengirim quotation kedua pada RFQ yang sama. | High | M |
| **FR-045** | Supplier | memungkinkan supplier melihat riwayat quotation yang pernah dikirim. | Ketika supplier membuka halaman quotation. | High | M |
| **FR-046** | Supplier | menampilkan status quotation yang telah dikirim. | Ketika supplier melihat daftar quotation. | High | M |
| **FR-047** | Supplier | mengirim notifikasi kepada supplier ketika terdapat RFQ baru yang sesuai dengan kategori usaha supplier. | Ketika RFQ baru didistribusikan. | Medium | S |
| **FR-048** | Supplier | menampilkan badge reputasi yang dimiliki supplier pada profil usaha. | Ketika supplier membuka profil usaha. | Medium | S |
| **FR-049** | Supplier | menghitung dan memperbarui badge Responsive Supplier berdasarkan performa respons RFQ. | Ketika data aktivitas supplier memenuhi kriteria badge. | Medium | S |
| **FR-050** | Supplier | menghitung dan memperbarui badge Trusted Supplier berdasarkan status verifikasi dan aturan reputasi platform. | Ketika supplier memenuhi kriteria badge. | Medium | S |
| **FR-051** | Supplier | memungkinkan supplier melihat statistik dasar aktivitas akun. | Ketika supplier membuka dashboard supplier. | Medium | S |
| **FR-052** | Supplier | memungkinkan supplier menerima RFQ tanpa batas sesuai paket Supplier Pro. | Ketika akun supplier memiliki status Supplier Pro. | Low | W (This Release) |
| **FR-053** | Supplier | memberikan prioritas tampilan supplier pada hasil pencarian dan direktori supplier. | Ketika akun supplier memiliki status Supplier Pro. | Low | W (This Release) |
| **FR-054** | Supplier | menampilkan dashboard analytics lanjutan untuk Supplier Pro. | Ketika Supplier Pro membuka dashboard analytics. | Low | W (This Release) |
| **FR-055** | Supplier | menampilkan procurement insights untuk Supplier Pro. | Ketika Supplier Pro membuka halaman insights. | Low | W (This Release) |

### **5.3  FR Table : Admin**

| FR ID | Actor | The system shall… | Condition / Trigger | Priority | MoSCoW |
| :---: | :---: | ----- | ----- | :---: | :---: |
| **FR-056** | Administrator | mengautentikasi akun administrator dan memberikan akses ke dashboard administrator. | Ketika administrator memasukkan kredensial yang valid saat login. | Critical | M |
| **FR-057** | Administrator | menampilkan daftar supplier yang mengajukan verifikasi. | Ketika administrator membuka halaman verifikasi supplier. | Critical | M |
| **FR-058** | Administrator | menampilkan detail data verifikasi supplier. | Ketika administrator memilih salah satu pengajuan verifikasi. | Critical | M |
| **FR-059** | Administrator | menyetujui pengajuan verifikasi supplier. | Ketika administrator memilih aksi approve pada pengajuan verifikasi. | Critical | M |
| **FR-060** | Administrator | menolak pengajuan verifikasi supplier. | Ketika administrator memilih aksi reject pada pengajuan verifikasi. | Critical | M |
| **FR-061** | Administrator | memperbarui status verifikasi supplier berdasarkan keputusan administrator. | Ketika pengajuan verifikasi diproses. | Critical | M |
| **FR-062** | Administrator | mengirim notifikasi hasil verifikasi kepada supplier. | Ketika pengajuan verifikasi disetujui atau ditolak. | High | S |
| **FR-063** | Administrator | menampilkan daftar seluruh supplier yang terdaftar pada platform. | Ketika administrator membuka halaman manajemen supplier. | High | M |
| **FR-064** | Administrator | melihat detail profil supplier. | Ketika administrator memilih supplier tertentu. | High | M |
| **FR-065** | Administrator | menonaktifkan akun supplier yang melanggar kebijakan platform. | Ketika administrator melakukan tindakan suspend supplier. | High | M |
| **FR-066** | Administrator | mengaktifkan kembali akun supplier yang sebelumnya dinonaktifkan. | Ketika administrator melakukan tindakan reactivate supplier. | Medium | S |
| **FR-067** | Administrator | membuat kategori supplier baru. | Ketika administrator menambahkan kategori supplier. | High | M |
| **FR-068** | Administrator | memperbarui kategori supplier. | Ketika administrator mengubah data kategori supplier. | High | M |
| **FR-069** | Administrator | menonaktifkan kategori supplier yang tidak lagi digunakan. | Ketika administrator melakukan pengelolaan kategori supplier. | Medium | S |
| **FR-070** | Administrator | menampilkan daftar RFQ yang dibuat oleh buyer. | Ketika administrator membuka halaman monitoring RFQ. | High | M |
| **FR-071** | Administrator | melihat detail RFQ. | Ketika administrator memilih RFQ tertentu. | High | M |
| **FR-072** | Administrator | memantau status RFQ pada platform. | Ketika administrator membuka dashboard monitoring RFQ. | High | M |
| **FR-073** | Administrator | menampilkan aktivitas quotation yang terjadi pada platform. | Ketika administrator membuka dashboard monitoring quotation. | Medium | S |
| **FR-074** | Administrator | menampilkan statistik dasar penggunaan platform. | Ketika administrator membuka dashboard administrator. | Medium | S |
| **FR-075** | Administrator | mengelola aturan badge reputasi supplier. | Ketika administrator melakukan konfigurasi sistem reputasi. | Medium | S |
| **FR-076** | Administrator | memberikan badge Trusted Supplier kepada supplier yang memenuhi kriteria. | Ketika supplier memenuhi aturan reputasi yang ditetapkan. | Medium | S |
| **FR-077** | Administrator | memberikan badge Responsive Supplier kepada supplier yang memenuhi kriteria. | Ketika supplier memenuhi aturan reputasi yang ditetapkan. | Medium | S |
| **FR-078** | Administrator | mengelola paket langganan Supplier Pro. | Ketika administrator mengelola konfigurasi monetisasi platform. | Low |  (ThisW Release) |
| **FR-079** | Administrator | mengelola paket langganan Buyer Pro. | Ketika administrator mengelola konfigurasi monetisasi platform. | Low | W (This Release) |
| **FR-080** | Administrator | melihat laporan subscription dan pendapatan platform. | Ketika administrator membuka dashboard monetisasi. | Low | W (This Release) |

# **6\.  User Workflows**

## **6.1  Workflow: Buyer Registration & Login** 

| Actor | Buyer |
| :---- | :---- |
| **Goal** | Memiliki akun dan dapat mengakses dashboard buyer.  |
| **FRs covered** | FR-001, FR-002, FR-003  |

### **Ideal Path**

| \# | Step description |
| :---: | ----- |
| **1** | Buyer membuka halaman registrasi.  |
| **2** | Buyer mengisi data registrasi yang diperlukan.  |
| **3** | Buyer mengirim formulir registrasi  |
| **4** | Sistem memvalidasi data registrasi.  |
| **5** | Sistem membuat akun buyer baru.  |
| **6** | Sistem menampilkan pesan registrasi berhasil.  |
| **7** | Buyer melakukan login menggunakan kredensial akun.  |
| **8** | Sistem memvalidasi kredensial login.  |
| **9** | Sistem memberikan akses ke dashboard buyer.  |

### 

### **Decision Points**

| Decision Point | YES / Success path | NO / Error path |
| ----- | ----- | ----- |
| **Data registrasi valid?**  | Sistem membuat akun buyer.  | \- Sistem menampilkan pesan kesalahan.  \- Buyer diminta memperbaiki data.  |
| **Kredensial login valid?**  | Sistem memberikan akses ke dashboard  | \- Sistem menampilkan pesan login gagal.  \- Buyer dapat mencoba kembali.  |

### **Edge Cases**

| Edge Case | What the system must do |
| ----- | ----- |
| Email sudah terdaftar  | Sistem menolak registrasi dan meminta buyer menggunakan email lain.  |
| Buyer melakukan login dengan akun yang dinonaktifkan  | Sistem menolak login dan menampilkan status akun.  |

## **6.2  Workflow: Create RFQ** 

| Actor | Buyer |
| :---- | :---- |
| **Goal** | Mengirim kebutuhan pengadaan kepada supplier yang relevan.  |
| **FRs covered** | FR-005, FR-006, FR-007, FR-008, FR-011, FR-012  |

### **Ideal Path**

| \# | Step description |
| :---: | ----- |
| **1** | Buyer memilih membuat RFQ baru.  |
| **2** | Buyer memilih kategori supplier.  |
| **3** | Buyer mengisi kebutuhan pengadaan.  |
| **4** | Buyer mengirim RFQ.  |
| **5** | Sistem memvalidasi data RFQ.  |
| **6** | Sistem menyimpan RFQ.  |
| **7** | Sistem mengidentifikasi supplier terverifikasi pada kategori terkait.  |
| **8** | Sistem mendistribusikan RFQ kepada supplier yang memenuhi kriteria.  |
| **9** | Sistem menampilkan status RFQ sebagai Open.  |

### **Decision Points**

| Decision Point | YES / Success path | NO / Error path |
| ----- | ----- | ----- |
| **Kategori supplier dipilih?**  | RFQ dapat diproses.  | Sistem meminta buyer memilih kategori.  |
| **RFQ valid?**  | RFQ disimpan.  | Sistem menampilkan kesalahan validasi.  |

### **Edge Cases**

| Edge Case | What the system must do |
| ----- | ----- |
| Tidak ada supplier terverifikasi pada kategori tersebut  | RFQ tetap dibuat dan sistem memberi informasi bahwa belum ada supplier yang tersedia.  |
| Buyer menutup RFQ sebelum quotation diterima  | Sistem mengubah status RFQ menjadi Closed dan menghentikan penerimaan quotation baru.  |

## **6.3  Workflow: Compare Quotation & Select Supplier** 

| Actor | Buyer |
| :---- | :---- |
| **Goal** | Memilih supplier terbaik berdasarkan quotation yang diterima.  |
| **FRs covered** | FR-013 sampai FR-018  |

### **Ideal Path**

| \# | Step description |
| :---: | ----- |
| **1** | Buyer membuka RFQ yang aktif.  |
| **2** | Sistem menampilkan seluruh quotation yang diterima.  |
| **3** | Buyer memilih beberapa quotation untuk dibandingkan.  |
| **4** | Sistem menampilkan perbandingan quotation.  |
| **5** | Buyer melihat profil supplier terkait.  |
| **6** | Buyer memilih satu supplier.  |
| **7** | Sistem menetapkan supplier terpilih.  |
| **8** | Sistem mengubah status RFQ menjadi Completed.  |

### **Decision Points**

| Decision Point | YES / Success path | NO / Error path |
| ----- | ----- | ----- |
| **Apakah terdapat quotation?**  | Buyer dapat melakukan evaluasi.  | Sistem menampilkan status belum ada quotation.  |
| **Supplier dipilih?**   | RFQ diselesaikan.  | RFQ tetap aktif.  |

### **Edge Cases**

| Edge Case | What the system must do |
| ----- | ----- |
| Semua quotation diterima setelah RFQ ditutup  | Sistem menolak quotation baru.  |
| Buyer mencoba memilih supplier dua kali  | Sistem mempertahankan supplier yang sudah dipilih dan menampilkan peringatan.  |

# **7\.  Data Requirements**

## **7.1  Data Entities**

| Entity | Deskripsi |
| ----- | ----- |
| Buyer | Pengguna yang membuat RFQ dan mencari supplier. |
| Supplier | Pengguna yang menawarkan produk atau layanan kepada buyer. |
| Supplier Verification | Data pengajuan verifikasi supplier. |
| Supplier Category | Kategori usaha yang dimiliki supplier. |
| RFQ (Request for Quotation) | Permintaan penawaran yang dibuat oleh buyer. |
| RFQ Category | Kategori supplier yang menjadi target RFQ. |
| Quotation | Penawaran yang dikirim supplier terhadap RFQ. |
| Supplier Badge | Badge reputasi yang dimiliki supplier. |
| Notification | Notifikasi sistem kepada buyer atau supplier. |
| Admin User | Administrator yang mengelola platform. |
| Activity Log | Riwayat aktivitas penting dalam sistem. |

## **7.2  Critical Attributes & Business Constraints** 

### **7.2.1 Buyer**

| Attribute | Constraint |
| ----- | ----- |
| Buyer ID | Harus unik. |
| Email | Harus unik dan valid. |
| Full Name | Wajib diisi. |
| Business Name | Wajib diisi. |
| Phone Number | Wajib diisi. |
| Account Status | Active atau Suspended. |
| Created At | Dibuat otomatis oleh sistem. |

### 

### **7.2.2 Supplier** 

| Attribute | Constraint |
| ----- | ----- |
| Supplier ID | Harus unik. |
| Email | Harus unik dan valid. |
| Business Name | Wajib diisi. |
| Business Address | Wajib diisi. |
| Phone Number | Wajib diisi. |
| Verification Status | Pending, Verified, Rejected. |
| Account Status | Active atau Suspended. |

### 

### **7.2.3 Supplier Verification** 

| Attribute | Constraint |
| ----- | ----- |
| Verification ID | Harus unik. |
| Supplier ID | Harus mengacu ke supplier yang valid. |
| Verification Document | Wajib diunggah. |
| Verification Status | Pending, Approved, Rejected. |
| Reviewed By | Mengacu ke administrator. |
| Reviewed At | Diisi saat proses review selesai. |

### 

### **7.2.4 Supplier Category** 

| Attribute | Constraint |
| ----- | ----- |
| Category ID | Harus unik. |
| Category Name | Harus unik. |
| Category Status | Active atau Inactive. |

### 

### **7.2.5 RFQ** 

| Attribute | Constraint |
| ----- | ----- |
| RFQ ID | Harus unik. |
| Buyer ID | Harus mengacu ke buyer yang valid. |
| RFQ Title | Wajib diisi. |
| RFQ Description | Wajib diisi. |
| RFQ Category | Wajib dipilih. |
| RFQ Status | Open, Closed, Completed. |
| Created At | Dibuat otomatis oleh sistem. |
| Closed At | Diisi ketika RFQ ditutup. |

### 

### **7.2.6 Quotation** 

| Attribute | Constraint |
| ----- | ----- |
| Quotation ID | Harus unik. |
| RFQ ID | Harus mengacu ke RFQ yang valid. |
| Supplier ID | Harus mengacu ke supplier yang valid. |
| Price Offer | Wajib diisi. |
| Notes | Opsional. |
| Submitted At | Dibuat otomatis oleh sistem. |

**Business Rules** 

* Satu supplier hanya dapat mengirim satu quotation untuk satu RFQ pada versi MVP.  
* Supplier hanya dapat mengirim quotation pada RFQ yang masih berstatus Open.  
* Quotation tidak dapat diubah setelah dikirim pada versi MVP.

### **7.2.7 Supplier Badge** 

| Attribute | Constraint |
| ----- | ----- |
| Badge ID | Harus unik. |
| Badge Name | Harus unik. |
| Supplier ID | Harus mengacu ke supplier yang valid. |
| Awarded At | Diisi otomatis saat badge diberikan. |

### **7.2.8 Notification** 

| Attribute | Constraint |
| ----- | ----- |
| Notification ID | Harus unik. |
| Recipient ID | Harus mengacu ke user yang valid. |
| Notification Type | RFQ, Quotation, Verification, System. |
| Read Status | Read atau Unread. |
| Created At | Dibuat otomatis oleh sistem. |

## **7.3  Entity Relationships** 

### **7.3.1 Buyer → RFQ** 

1 Buyer  
↓  
Many RFQ  
Seorang buyer dapat membuat banyak RFQ. 

### **7.3.2 RFQ → Quotation** 

1 RFQ  
↓  
Many Quotation  
Satu RFQ dapat menerima banyak quotation dari supplier berbeda. 

### **7.3.3 Supplier → Quotation** 

1 Supplier  
↓  
Many Quotation  
Satu supplier dapat mengirim banyak quotation pada RFQ yang berbeda. 

### **7.3.4 Supplier → Supplier Verification** 

1 Supplier  
↓  
Many Verification Records  
Satu supplier dapat memiliki beberapa kategori usaha. 

### **7.3.5 RFQ → Category** 

Many RFQ  
↓  
One Category  
Setiap RFQ wajib memiliki satu kategori utama pada MVP. 

### **7.3.6 Supplier → Badge** 

1 Supplier  
↓  
Many Badge  
Supplier dapat memiliki lebih dari satu badge reputasi. 

## **7.4  Data Retention & Privacy**  

### **7.4.1 Data Classification** 

StockUp mengelola data bisnis dan data identitas pengguna yang termasuk data pribadi.

Data yang dikategorikan sebagai data pribadi:

* Nama pengguna  
* Email  
* Nomor telepon  
* Alamat usaha  
* Dokumen verifikasi supplier

Data tersebut hanya boleh digunakan untuk kebutuhan operasional platform StockUp.

### **7.4.2 Consent & Purpose Limitation** 

Pengguna harus memberikan persetujuan saat melakukan registrasi akun.

Data pengguna hanya digunakan untuk:

* Verifikasi identitas akun  
* Distribusi RFQ  
* Pengelolaan quotation  
* Operasional platform

Data tidak boleh dibagikan kepada pihak ketiga tanpa persetujuan pengguna, kecuali diwajibkan oleh hukum yang berlaku.

### **7.4.3 Data Retention Policy** 

| Attribute | Constraint |
| ----- | ----- |
| Akun Buyer | Selama akun aktif dan maksimal 2 tahun setelah akun tidak aktif. |
| Akun Supplier | Selama akun aktif dan maksimal 2 tahun setelah akun tidak aktif. |
| RFQ | Minimal 5 tahun. |
| Quotation | Minimal 5 tahun. |
| Activity Log | Minimal 2 tahun. |
| Verification Records | Minimal 5 tahun. |

Setelah masa retensi berakhir, data dapat dihapus atau dianonimkan sesuai kebijakan perusahaan dan regulasi yang berlaku. 

### **7.4.4 Right to Access & Correction**  

Pengguna berhak:

* Melihat data profil yang tersimpan.  
* Memperbarui informasi profil yang tidak akurat.  
* Mengajukan permintaan koreksi data kepada administrator.

Permintaan koreksi data harus diproses dalam waktu maksimal 14 hari kalender sejak permintaan diterima.

### **7.4.5 Future Data Considerations (Post-MVP)** 

Entitas berikut belum termasuk dalam MVP tetapi telah direncanakan pada roadmap produk:

* Product Catalog  
* Product  
* Product Category  
* Supplier Rating  
* Supplier Review  
* Subscription Plan  
* Subscription Transaction  
* Procurement Analytics  
* Procurement Intelligence  
* Supplier Recommendation  
* Price Trend History  
* Procurement Insight Dataset

# **8\.  Non-Functional Requirements (NFRs)** 

## **8.1  Performance** 

NFR-01 \[Performance\]

Sistem harus menampilkan halaman direktori supplier dalam waktu maksimal 3 detik untuk 95% permintaan pengguna pada kondisi normal, diverifikasi menggunakan load testing dengan minimal 100 pengguna aktif secara bersamaan.

NFR-02 \[Performance\]

Sistem harus menampilkan daftar RFQ dalam waktu maksimal 2 detik untuk 95% permintaan pengguna, diverifikasi menggunakan pengujian performa API.

NFR-03 \[Performance\]

Sistem harus memproses pembuatan RFQ dan mendistribusikannya ke supplier terkait dalam waktu maksimal 5 detik setelah RFQ dikirim, diverifikasi menggunakan integration testing.

NFR-04 \[Performance\]

Sistem harus mampu mendukung minimal 500 pengguna terdaftar dan 100 pengguna aktif secara bersamaan tanpa penurunan performa yang signifikan, diverifikasi menggunakan load testing.

## **8.2  Security** 

NFR-05 \[Security\]

Seluruh komunikasi data antara client dan server harus menggunakan protokol HTTPS dengan TLS 1.2 atau lebih tinggi, diverifikasi melalui security testing sebelum go-live.

NFR-06 \[Security\]

Password pengguna harus disimpan dalam bentuk hash menggunakan algoritma yang aman seperti bcrypt atau Argon2, diverifikasi melalui code review dan security audit

NFR-07 \[Security\]

Pengguna hanya dapat mengakses data sesuai peran yang dimiliki (Buyer, Supplier, atau Administrator), diverifikasi melalui authorization testing.

NFR-08 \[Security\]

Dokumen verifikasi supplier harus hanya dapat diakses oleh administrator yang berwenang, diverifikasi melalui access control testing.

NFR-09 \[Security\]

Sistem harus mencatat seluruh aktivitas administratif penting ke dalam activity log, diverifikasi melalui audit log testing.

## **8.3  Availability** 

NFR-10 \[Availability\]

Platform harus memiliki tingkat ketersediaan (uptime) minimal 99% per bulan, tidak termasuk maintenance terjadwal, diverifikasi menggunakan monitoring service.

NFR-11 \[Availability\]

Sistem harus dapat melakukan backup database otomatis minimal satu kali setiap hari, diverifikasi melalui backup monitoring dan restore testing.

NFR-12 \[Availability\]

Sistem harus mampu melakukan pemulihan data dari backup dengan kehilangan data maksimal 24 jam, diverifikasi melalui disaster recovery testing.

## **8.4  Reliability**  

NFR-13 \[Reliability\]

Sistem harus menjaga konsistensi data RFQ dan quotation sehingga tidak terjadi duplikasi data akibat pengiriman berulang, diverifikasi melalui integration testing.

NFR-14 \[Reliability\]

Sistem harus memastikan satu supplier hanya dapat mengirim satu quotation untuk satu RFQ pada MVP, diverifikasi melalui automated testing.

NFR-15 \[Reliability\]

Sistem harus mempertahankan integritas relasi data antara Buyer, Supplier, RFQ, dan Quotation, diverifikasi melalui database constraint testing

.

## **8.5  Usability** 

NFR-16 \[Usability\]

Pengguna baru harus dapat membuat RFQ pertama dalam waktu maksimal 10 menit tanpa bantuan administrator, diverifikasi melalui usability testing.

NFR-17 \[Usability\]

Pengguna harus dapat memahami status RFQ (Open, Closed, Completed) tanpa memerlukan dokumentasi tambahan, diverifikasi melalui user acceptance testing.

NFR-18 \[Usability\]

Sistem harus mendukung penggunaan pada perangkat desktop dan mobile browser melalui desain responsif, diverifikasi melalui cross-device testing.

## **8.6 Scalability** 

NFR-19 \[Scalability\]

Arsitektur sistem harus memungkinkan penambahan kategori supplier dan peningkatan jumlah pengguna tanpa perubahan besar pada desain aplikasi, diverifikasi melalui architecture review.

NFR-20 \[Scalability\]

Sistem harus mampu mendukung ekspansi wilayah operasional dari Yogyakarta ke wilayah lain di Indonesia tanpa perubahan struktur data utama, diverifikasi melalui database design review.

NFR-21 \[Scalability\]

Sistem harus memungkinkan implementasi fitur Subscription, Product Catalog, dan Supplier Recommendation pada versi mendatang tanpa migrasi besar terhadap data inti platform, diverifikasi melalui architecture review.

## **8.7 Privacy & Compliance** 

NFR-22 \[Privacy\]

Sistem harus memperoleh persetujuan pengguna sebelum mengumpulkan dan menyimpan data pribadi, diverifikasi melalui legal review dan user acceptance testing.

NFR-23 \[Privacy\]

Data pribadi pengguna hanya boleh digunakan untuk operasional StockUp sesuai tujuan yang telah disetujui pengguna, diverifikasi melalui audit kebijakan data.

NFR-24 \[Privacy\]

Pengguna harus dapat melihat dan memperbarui data profil mereka sendiri, diverifikasi melalui functional testing.

NFR-25 \[Privacy\]

Dokumen verifikasi supplier dan data pribadi pengguna harus disimpan sesuai prinsip perlindungan data yang berlaku di Indonesia, diverifikasi melalui compliance review sebelum peluncuran produk.

**8.8 Assumptions, Constraints & Dependencies**   
**Assumptions** 

| No | Assumption |
| ----- | ----- |
| A-01 | Buyer dan supplier memiliki akses internet yang stabil. |
| A-02 | Supplier bersedia mengikuti proses verifikasi platform. |
| A-03 | Pengguna memiliki alamat email yang aktif untuk registrasi akun. |
| A-04 | Sebagian besar proses negosiasi dan transaksi tetap dilakukan di luar platform pada MVP. |
| A-05 | Target pasar awal F\&B di Yogyakarta cukup untuk memvalidasi kebutuhan produk. |

**Constraints** 

| No | Assumption |
| ----- | ----- |
| C-01 | MVP dikembangkan sebagai Responsive Web Application. |
| C-02 | Pengembangan dilakukan oleh tim dengan sumber daya terbatas. |
| C-03 | Platform tidak menangani pembayaran pada MVP. |
| C-04 | Platform tidak menyediakan layanan logistik atau pengiriman barang pada MVP. |
| C-05 | Fokus validasi pasar dilakukan pada sektor F\&B sebelum ekspansi ke sektor lain. |

**External Dependencies** 

| No | Assumption |
| ----- | ----- |
| D-01 | Layanan email untuk notifikasi akun dan verifikasi. |
| D-02 | Infrastruktur hosting dan database cloud. |
| D-03 | Domain dan layanan SSL/TLS untuk keamanan komunikasi data. |
| D-04 | Penyedia penyimpanan dokumen untuk dokumen verifikasi supplier. |
| D-05 | Sistem monitoring dan logging untuk memantau kesehatan platform. |

# **9\.  Design Considerations** 

## **9.1 Design Principles** 

Prinsip desain utama:

* Mengutamakan kesederhanaan dan kemudahan penggunaan.  
* Mengurangi jumlah langkah yang diperlukan untuk membuat RFQ.  
* Mempermudah buyer dalam membandingkan beberapa quotation.  
* Menampilkan informasi supplier secara transparan dan mudah dipahami.  
* Mengurangi hambatan bagi supplier dalam menerima dan merespons RFQ.  
* Menjaga konsistensi pengalaman pengguna di seluruh platform.

## **9.2 User Personas & UX Requirements** 

**Buyer**

**User Characteristics**

* Pemilik atau pengelola usaha F\&B.  
* Tidak selalu memiliki latar belakang teknis.  
* Memiliki keterbatasan waktu untuk mencari supplier.

**UX Requirements**

* Pengguna harus dapat menemukan supplier tanpa perlu login.  
* Pengguna baru harus dapat membuat RFQ pertama tanpa bantuan administrator.  
* Proses pembuatan RFQ harus dapat diselesaikan dengan langkah seminimal mungkin.  
* Informasi quotation harus mudah dibandingkan.  
* Status RFQ harus mudah dipahami.

**Supplier**

**User Characteristics**

* Pemilik usaha supplier skala UMKM hingga distributor.  
* Fokus pada memperoleh peluang bisnis baru.  
* Memiliki tingkat literasi digital yang beragam.

**UX Requirements**

* Proses registrasi supplier harus mudah dipahami.  
* Proses verifikasi supplier harus jelas dan transparan.  
* Supplier harus dapat menemukan RFQ yang relevan dengan cepat.  
* Supplier harus dapat mengirim quotation tanpa memerlukan pelatihan khusus.  
* Status verifikasi dan status quotation harus selalu terlihat jelas.

**Administrator**

**User Characteristics**

* Bertanggung jawab menjaga kualitas data platform.  
* Mengelola proses verifikasi supplier.  
* Memantau aktivitas platform.

**UX Requirements**

* Dashboard harus mempermudah proses verifikasi supplier.  
* Aktivitas yang memerlukan tindakan harus mudah ditemukan.  
* Data RFQ dan supplier harus mudah dicari dan di filter.  
* Aktivitas administratif penting harus dapat ditelusuri melalui log sistem.

## **9.3 Accessibility Requirements** 

**DR-01 Accessibility**

Platform harus memenuhi prinsip aksesibilitas dasar yang mengacu pada WCAG 2.1 Level AA sejauh memungkinkan untuk MVP.

**DR-02 Accessibility**

Seluruh fungsi utama platform harus dapat digunakan menggunakan keyboard tanpa ketergantungan pada perangkat input tertentu.

**DR-03 Accessibility**

Informasi penting tidak boleh disampaikan hanya melalui warna dan harus memiliki indikator tambahan berupa teks atau ikon.

**DR-04 Accessibility**

Kontras warna antarmuka harus memenuhi standar keterbacaan untuk pengguna dengan gangguan penglihatan ringan hingga sedang.

## **9.4 Responsive Design Requirements** 

**DR-05 Platform Support**

Seluruh fitur utama harus dapat digunakan pada:

* Desktop Browser  
* Tablet Browser  
* Mobile Browser

**DR-06 Responsive Layout**

Seluruh alur utama sistem harus berfungsi pada lebar layar minimal 360px.

**DR-07 Responsive Workflow**

Workflow berikut harus tetap dapat digunakan secara penuh pada perangkat mobile:

* Registrasi akun  
* Login  
* Pencarian supplier  
* Pembuatan RFQ  
* Pengiriman quotation  
* Verifikasi supplier

## **9.5 Branding & Visual Identity Constraints** 

**DR-08 Branding**

Seluruh antarmuka harus menggunakan identitas visual resmi StockUp yang ditetapkan pada Brand Guidelines.

**DR-09 Branding**

Logo, nama produk, dan elemen identitas merek harus ditampilkan secara konsisten pada seluruh platform.

**DR-10 Branding**

Implementasi visual harus mendukung positioning produk sebagai platform B2B procurement dan supplier discovery yang profesional dan terpercaya.

## **9.6 UX Success Criteria** 

| UX Goal | Success Criteria | Validation Method |
| ----- | ----- | ----- |
| Registrasi Buyer | ≥ 90% pengguna berhasil menyelesaikan registrasi | Usability Testing |
| Registrasi Supplier | ≥ 85% pengguna berhasil menyelesaikan registrasi supplier | Usability Testing |
| Pembuatan RFQ | ≥ 80% pengguna dapat membuat RFQ pertama tanpa bantuan | Usability Testing |
| Pengiriman Quotation | ≥ 80% supplier dapat mengirim quotation pertama tanpa bantuan | Usability Testing |
| Pencarian Supplier | Pengguna dapat menemukan supplier yang relevan dalam ≤ 3 menit | User Testing |

## 

## **9.7 Future Design Considerations (Post-MVP)** 

* Product Catalog Experience  
* Supplier Rating & Review Experience  
* Procurement Analytics Dashboard  
* Supplier Recommendation Experience  
* Subscription Management Experience  
* Procurement Intelligence Dashboard  
* Multi-Supplier Selection Workflow  
* Mobile Application Design System

# **10\. Release & Roadmap Planning** 

## **10.1 Product Release Strategy**

StockUp akan dikembangkan menggunakan pendekatan MVP (Minimum Viable Product) untuk memvalidasi kebutuhan pasar sebelum mengembangkan fitur yang lebih kompleks.

Prioritas pengembangan mengikuti prinsip:

1. Menyelesaikan masalah supplier discovery.  
2. Memvalidasi proses RFQ dan quotation.  
3. Meningkatkan kepercayaan pengguna.  
4. Mengembangkan monetisasi platform.  
5. Mengembangkan fitur procurement yang lebih cerdas.

Pendekatan ini memungkinkan tim memperoleh umpan balik pengguna lebih awal dan mengurangi risiko pengembangan fitur yang belum terbukti dibutuhkan pasar.

## **10.2 Version Roadmap**

**Version 1.0 (MVP)**

**Fokus Utama**

Supplier Discovery & RFQ Management

**Fitur Utama**

**Buyer**

* Registrasi Akun  
* Login  
* Membuat RFQ  
* Mengelola RFQ  
* Melihat Quotation  
* Membandingkan Quotation

**Supplier**

* Registrasi Supplier  
* Pengajuan Verifikasi  
* Manajemen Profil Supplier  
* Menerima RFQ  
* Mengirim Quotation

**Administrator**

* Verifikasi Supplier  
* Manajemen Kategori Supplier  
* Monitoring RFQ

**Publik**

* Direktori Supplier  
* Pencarian Supplier  
* Filter Supplier  
* Profil Supplier

**Tujuan**

Memvalidasi bahwa buyer dan supplier bersedia menggunakan platform sebagai media supplier sourcing.

**Version 1.5**

**Fokus Utama**

Meningkatkan trust dan kredibilitas supplier.

**Fitur Tambahan**

* Rating Supplier  
* Review Supplier  
* Trusted Supplier Badge  
* Responsive Supplier Badge  
* Notifikasi Email

**Tujuan**

Membantu buyer mengevaluasi supplier dengan lebih baik.

**Version 2.0**

**Fokus Utama**

Monetisasi Platform

**Fitur Tambahan**

* Supplier Pro  
* Prioritas Direktori Supplier  
* Analytics Premium Supplier  
* Buyer Pro  
* RFQ Priority Placement  
* Procurement Intelligence

**Tujuan**

Memvalidasi willingness to pay dari supplier dan buyer.

**Version 3.0**

**Fokus Utama**

Product Discovery

**Fitur Tambahan**

* Product Catalog  
* Product Search  
* Product Categories  
* Product Comparison

**Tujuan**

Membantu buyer menemukan produk secara lebih spesifik.

**Version 4.0**

**Fokus Utama**

Data & Procurement Intelligence

**Fitur Tambahan**

* Supplier Analytics  
* Procurement Analytics  
* Supplier Recommendation  
* Supplier Match Score

**Tujuan**

Meningkatkan kualitas keputusan procurement.

**Version 5.0**

**Fokus Utama**

End-to-End Procurement Platform

**Fitur Tambahan**

* Order Management  
* Invoice Management  
* Payment Integration  
* Multi-Supplier Selection  
* Order Tracking

**Tujuan**

Mentransformasikan StockUp menjadi platform procurement yang lebih lengkap

## **10.3 Milestone Schedule (3 Months)** 

| Minggu | Milestone | Owner | Deliverable |
| ----- | ----- | ----- | ----- |
| Week 1 | Product Discovery & PRD Finalization | Product Team | PRD Final |
| Week 2 | Use Case & Workflow Design | Product Team | Use Case Diagram, Workflow Diagram |
| Week 3 | Database Design | Backend Team | ERD & Database Schema |
| Week 4 | UI/UX Wireframe | Design Team | Low Fidelity Wireframe |
| Week 5 | High Fidelity Design | Design Team | UI Design System & Prototype |
| Week 6 | Backend Foundation | Backend Team | Authentication & Core API |
| Week 7 | Buyer Module Development | Development Team | Buyer Features |
| Week 8 | Supplier Module Development | Development Team | Supplier Features |
| Week 9 | Admin Module Development | Development Team | Admin Features |
| Week 10 | RFQ & Quotation Integration | Development Team | End-to-End RFQ Flow |
| Week 11 | Testing & Bug Fixing | QA Team | Test Report |
| Week 12 | Production Preparation & Go-Live | Entire Team | MVP Release |

## **10.4 Dependency Mapping** 

**Critical Dependencies**

**Authentication**

Authentication  
↓  
Buyer Features  
↓  
Supplier Features  
↓  
Admin Features

Semua fitur pengguna bergantung pada sistem autentikasi.

**Supplier Verification**

Supplier Verification  
↓  
Supplier Receives RFQ  
↓  
Supplier Sends Quotation

Supplier harus terverifikasi sebelum dapat menerima RFQ.

**RFQ Management**

Create RFQ  
↓  
Receive RFQ  
↓  
Submit Quotation  
↓  
Compare Quotation

Alur procurement tidak dapat berjalan jika modul RFQ belum selesai.

**Supplier Directory**

Supplier Profile  
↓  
Supplier Directory  
↓  
Search & Filter

Pencarian supplier bergantung pada data supplier yang telah tersedia.

## **10.5 Definition of Done (DoD)** 

| Status | Definition of Done |
| :---: | ----- |
| ☐ | Seluruh Functional Requirements kategori Must Have telah selesai diimplementasikan. |
| ☐ | Seluruh Functional Requirements kategori Must Have memiliki test case yang lulus. |
| ☐ | Tidak terdapat bug dengan tingkat Critical atau High Severity. |
| ☐ | Seluruh API utama telah berhasil diuji. |
| ☐ | Database migration berhasil dijalankan pada environment staging. |
| ☐ | Seluruh workflow utama berhasil diuji end-to-end. |
| ☐ | Responsive testing berhasil pada desktop dan mobile browser. |
| ☐ | Security testing dasar telah dilakukan. |
| ☐ | Dokumentasi deployment telah tersedia. |
| ☐ | Product Owner menyetujui release kandidat. |

## **10.6 Go-Live Checklist** 

| Status | Go-Live Checklist |
| :---: | ----- |
| ☐ | Domain production telah aktif. |
| ☐ | SSL/TLS certificate telah terpasang dan valid. |
| ☐ | Environment production telah dikonfigurasi. |
| ☐ | Backup database otomatis telah dikonfigurasi. |
| ☐ | Monitoring dan logging telah aktif. |
| ☐ | Error tracking telah aktif. |
| ☐ | Restore backup berhasil diuji. |
| ☐ | Akun administrator production telah dibuat. |
| ☐ | Kebijakan privasi dan Terms of Service telah dipublikasikan. |
| ☐ | Rollback plan telah didokumentasikan. |
| ☐ | Deployment checklist telah diverifikasi oleh tim teknis. |
| ☐ | Tim menyetujui peluncuran MVP ke production. |

# **Revision History**

| Version | Date | Author | Changes |
| :---: | ----- | ----- | ----- |
| v1.0 | 1 June 2026 | Syarif Hidayatullah | Initial draft |
| v1.2 | 6 June 2026 | Syarif Hidayatullah | Penulisan Ulang Problem Statement |
| v1.3 | 7 June 2026 | Syarif Hidayatullah | Penulisan Ulang Seluruh Point Selain PS |

