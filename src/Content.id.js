// Indonesian overlay for Content.js. Only text lives here: icons, images and
// anything left out keep their English value. Lists of objects are keyed by
// the item's English name / title / institution / label / link (see
// overlay() in hooks/useLanguage.jsx).
export const id = {
  nav: {
    "#home": { text: "Beranda" },
    "#skills": { text: "Keahlian" },
    "#journey": { text: "Perjalanan" },
    "#projects": { text: "Karya" },
    "#contact": { text: "Kontak" },
  },

  hero: {
    tagline: "Menulis kode dengan tujuan, merancang dengan kejelasan.",
    intro:
      "Fullstack Developer di RS Yukum Medical Centre dan lulusan Teknik Informatika Universitas Lampung. Saya membangun produk web dari ujung ke ujung, mulai dari wireframe Figma hingga antarmuka yang teruji dan siap produksi.",
    btnText: "Hubungi Saya",
    secondaryBtnText: "Lihat Karya Saya",
    stats: {
      "GPA, Informatics Eng.": { label: "IPK Teknik Informatika" },
      "Projects shipped": { label: "Proyek selesai" },
      "Students mentored": { label: "Mahasiswa dibimbing" },
      "Best Team of 12, Binar Academy": { label: "Tim Terbaik dari 12, Binar Academy" },
    },
  },

  skills: {
    eyebrow: "Layanan & Stack",
    title: "Yang Saya Kerjakan",
    subtitle: "Pekerjaan yang saya tangani, dan stack di balik setiap bagiannya",
    services: {
      "Web Development": {
        title: "Pengembangan Web",
        para: "Aplikasi web yang responsif dan dinamis dengan React, Next.js, dan Node.js.",
        points: ["React & Node.js", "Integrasi REST API", "Layout responsif"],
      },
      "UI/UX Design": {
        title: "Desain UI/UX",
        para: "Antarmuka yang berpusat pada pengguna, dirancang di Figma dan diserahkan ke developer dengan rapi.",
        points: ["Prototipe Figma", "Design system", "Handoff ke developer"],
      },
      "Automation Testing": {
        para: "Rangkaian tes otomatis dan pengecekan CI yang menjaga setiap rilis tetap stabil.",
        points: ["Suite Selenium", "Regression testing", "CI GitHub Actions"],
      },
      "Embedded Prototyping": {
        title: "Prototipe Embedded",
        para: "Prototipe logika digital dan mikrokontroler dengan embedded C/C++.",
        points: ["Arduino & sensor", "Desain logika digital", "Embedded C/C++"],
      },
    },
    skills_content: {
      "React.js": { para: "Library JavaScript untuk membangun antarmuka berbasis komponen." },
      "Next.js": {
        para: "Framework React untuk aplikasi produksi, dengan routing, rendering, dan optimasi gambar bawaan.",
        usage: ["Membangun platform Suhita Bee Farm: 10+ halaman responsif dengan skor Lighthouse 93+."],
      },
      JavaScript: { para: "Bahasa di balik setiap antarmuka interaktif di halaman ini." },
      "Tailwind CSS": {
        para: "Framework CSS utility-first untuk membangun antarmuka yang cepat dan fleksibel.",
        usage: ["Juga dipakai untuk styling portofolio ini, termasuk tema terang dan gelapnya."],
      },
      "Node.js": {
        para: "Runtime JavaScript untuk aplikasi sisi server dan REST API.",
        usage: ["Merancang 20+ endpoint REST API dengan autentikasi JWT, PostgreSQL, dan Prisma ORM di program Binar Academy."],
      },
      "Express.js": { para: "Framework backend yang minimalis dan fleksibel untuk Node.js." },
      "Git & GitHub": {
        para: "Version control dan hosting untuk melacak perubahan dan berkolaborasi pada kode.",
        usage: ["Version control untuk setiap proyek di halaman ini."],
      },
      "Shadcn UI": { para: "Library komponen UI modern berbasis Tailwind CSS dan Radix UI." },
      Vite: {
        para: "Build tool cepat untuk proyek JavaScript dan React dengan hot reload instan.",
        usage: ["Juga dipakai untuk build portofolio ini."],
      },
      Bootstrap: { para: "Framework CSS populer untuk membangun antarmuka yang responsif dan cepat." },
      Postman: {
        para: "Platform untuk membangun, menguji, dan mendokumentasikan API.",
        usage: ["Menguji REST API selama pengembangan backend."],
      },
      EmailJS: {
        para: "Mengirim email langsung dari kode sisi klien, tanpa backend khusus.",
        usage: ["Menjalankan form kontak di portofolio ini."],
      },
      Figma: {
        para: "Tool desain untuk prototipe UI/UX yang interaktif.",
        usage: ["Wireframe dan prototipe sebelum pengembangan, dari wireframe Figma hingga antarmuka produksi."],
      },
      Canva: {
        para: "Tool desain cepat untuk grafis, mockup, dan materi presentasi.",
        usage: ["Aset media sosial dan slide presentasi."],
      },
      Python: { para: "Bahasa serbaguna untuk layanan backend, pengolahan data, dan otomasi." },
      "Selenium IDE": {
        para: "Tool berbasis browser untuk merekam dan menjalankan tes otomatis.",
        usage: ["Merekam suite regression test untuk aplikasi web."],
      },
      "Arduino IDE": {
        para: "Lingkungan open-source untuk memprogram mikrokontroler seperti board Arduino.",
        usage: ["Prototipe mikrokontroler dan sensor dengan embedded C/C++."],
      },
    },
  },

  journey: {
    title: "Perjalanan Saya",
    subtitle: "Latar belakang pendidikan & pengalaman",
    education_content: {
      "RS Yukum Medical Centre": {
        kind: "Pengalaman",
        period: "Sep 2026 - Sekarang",
        description:
          "Membangun dan memelihara aplikasi web internal yang mendukung unit-unit rumah sakit, mencakup antarmuka hingga layanan backend di baliknya.",
      },
      "Suhita Bee Farm, Bandar Lampung": {
        kind: "Pengalaman",
        degree: "Frontend Developer (Proyek Penelitian & Pengabdian Masyarakat)",
        description:
          "Proyek tugas akhir yang dijalankan sebagai gabungan penelitian dan pengabdian kepada masyarakat. Membangun platform web Suhita Bee Farm dengan Next.js, menerapkan User Centered Design (UCD) dan Rapid Application Development (RAD) agar antarmukanya sesuai dengan kebutuhan nyata peternakan.",
        achievements: [
          "Membangun 10+ halaman yang sepenuhnya responsif di Next.js dengan kompatibilitas 100% di mobile dan desktop",
          "Mengintegrasikan 31 endpoint RESTful API, termasuk fitur klasifikasi gambar berbasis AI yang memproses data lebah dalam waktu kurang dari 1,5 detik",
          "Meraih skor Google Lighthouse 93+ dan skor System Usability Scale 83,83 (Grade A, Excellent) pada pengujian pengguna",
        ],
      },
      "Dinas Sosial Provinsi Lampung, Bandar Lampung": {
        kind: "Pengalaman",
        period: "Jun 2025 - Agu 2025",
        description:
          "Mengerjakan SOSIALink, platform internal yang menggantikan pencatatan manual untuk data penerima bantuan sosial dan dokumen resmi.",
        achievements: [
          "Mengembangkan 8+ modul inti di platform SOSIALink, mencakup pengelolaan data penerima bantuan dan pengarsipan digital",
          "Menambahkan pencarian multi-parameter dan ekspor Excel sehingga staf admin dapat menyusun laporan bulanan dalam beberapa klik, tidak lagi secara manual",
          "Menerapkan Scrum dalam tim lintas fungsi selama 4 sprint dua mingguan, dengan 100% fitur yang direncanakan selesai tepat waktu",
        ],
      },
      "PT Lentera Bangsa Benderang (Binar Academy)": {
        kind: "Pendidikan",
        description:
          "Program studi independen MSIB yang mencakup pengembangan web fullstack, dengan lebih dari 195 jam pelatihan intensif dan pengerjaan proyek kolaboratif.",
        achievements: [
          "Merancang dan membangun 20+ endpoint RESTful API, termasuk autentikasi JWT dan logika bisnis untuk validasi pemesanan dan transaksi, dengan PostgreSQL dan Prisma ORM",
          "Mengintegrasikan frontend dan backend untuk 2 aplikasi fullstack: Binar Rental Car, dan TiketKu, sistem reservasi penerbangan yang menjadi proyek akhir",
          "Meraih predikat Tim Terbaik dari 12 tim (80+ peserta) untuk implementasi fitur fullstack dan presentasi produk",
        ],
      },
      "Digital Engineering Laboratory, Universitas Lampung": {
        kind: "Pengalaman",
        institution: "Laboratorium Teknik Digital, Universitas Lampung",
        degree: "Asisten Laboratorium",
        description:
          "Menjalankan sesi praktikum di lima mata kuliah, mulai dari menyampaikan materi dan mengawasi percobaan hingga mengevaluasi hasil dan laporan.",
        achievements: [
          "Mengajar dan membimbing 200+ mahasiswa di 5 mata kuliah praktikum",
          "Menulis dan memperbarui 5 modul praktikum yang dipakai sebagai bahan ajar resmi",
          "Mengoordinasikan 40+ sesi praktikum selama 3 tahun bersama tim asisten, memastikan peralatan selalu siap sehingga sesi berjalan tanpa kendala teknis",
        ],
      },
      "Universitas Lampung, Bandar Lampung": {
        kind: "Pendidikan",
        period: "Agu 2022 - Jun 2026",
        degree: "Sarjana Teknik Informatika",
        description:
          "Lulus pada Juni 2026 dengan IPK 3,83 dari 4,00, berfokus pada pengembangan web fullstack. Menutup masa studi dengan proyek penelitian dan pengabdian masyarakat untuk Suhita Bee Farm.",
        achievements: [
          "Membimbing 200+ mahasiswa di praktikum laboratorium dan menulis 5 modul pembelajaran yang diadopsi sebagai bahan rujukan di Laboratorium Teknik Digital",
          "Membangun website klasifikasi spesies lebah madu yang mengintegrasikan model CNN melalui RESTful API, diajukan sebagai penelitian dan pengabdian masyarakat",
        ],
      },
    },
  },

  Projects: {
    title: "Karya Saya",
    subtitle: "Proyek & studi kasus",
    project_content: {
      Sealbox: {
        type: "Aplikasi Web Keamanan",
        desc: "Password manager zero-knowledge di mana seluruh proses enkripsi berjalan di browser, sehingga server hanya pernah menyimpan data terenkripsi. Master password diperkuat dengan PBKDF2 (600.000 iterasi) dan HKDF menjadi kunci yang membungkus vault key AES-256-GCM. Vault disinkronkan lewat Supabase dengan Row Level Security, tetap bisa dibaca offline dari cache IndexedDB terenkripsi, dan tersedia sebagai PWA yang bisa di-install serta ekstensi browser Manifest V3 dengan autofill, tawaran simpan login, dan generator password di halaman. Dilengkapi juga 2FA TOTP, recovery key, backup terenkripsi, riwayat item 30 hari, dan cek kesehatan password terhadap Have I Been Pwned dengan k-anonymity.",
        metrics: ["AES-256-GCM, zero-knowledge", "PWA + ekstensi browser"],
      },
      Beevra: {
        type: "Penelitian & Pengabdian Masyarakat",
        desc: "Platform web untuk Suhita Bee Farm, diajukan sebagai proyek penelitian dan pengabdian masyarakat tugas akhir saya dengan judul Sistem Klasifikasi Spesies Lebah Madu Indo-Malaya. Model CNN yang dilayani melalui RESTful API mengidentifikasi spesies lebah dalam waktu kurang dari 1,5 detik, dilengkapi database informasi lebah yang bisa dicari, difilter berdasarkan genus, dan diedit oleh admin, serta pemantauan sarang dan area akun.",
        metrics: ["Lighthouse 93+", "SUS 83,83 - Grade A"],
      },
      SosiaLINK: {
        type: "Aplikasi Web Pemerintah",
        metrics: ["8+ modul inti", "4 sprint, 100% tepat waktu"],
        desc: "Platform internal yang dibangun selama magang di Dinas Sosial Provinsi Lampung, menggantikan pencatatan manual untuk data penerima bantuan sosial dan dokumen resmi. Mencakup 8+ modul inti dengan area admin terautentikasi, pencarian multi-parameter, dan ekspor Excel, sehingga laporan bulanan cukup dibuat dengan beberapa klik, tidak lagi disusun manual.",
      },
      FresJewellry: {
        desc: "Toko perhiasan online dengan katalog produk per kategori, carousel produk horizontal, format harga Rupiah, dan alur tambah ke keranjang, dengan tampilan bernuansa emas hangat dan netral sesuai identitas brand.",
      },
      TiketKu: {
        type: "Proyek Capstone",
        desc: "Sistem reservasi penerbangan yang dibangun sebagai proyek akhir program fullstack Binar Academy, mencakup antarmuka hingga REST API di baliknya. Fiturnya meliputi pencarian penerbangan dengan jadwal pergi dan pulang, pilihan kelas kursi, destinasi favorit dengan harga diskon, serta layout yang tetap rapi di desktop maupun mobile.",
        metrics: ["Tim Terbaik dari 12 tim", "80+ peserta"],
      },
      "Binar Rental Car": {
        type: "Aplikasi Web Fullstack",
        desc: "Aplikasi rental mobil untuk wilayah Bandar Lampung, salah satu dari dua proyek fullstack di program Binar Academy di mana saya menghubungkan antarmuka dengan backend buatan sendiri. Mencakup halaman layanan, daftar keunggulan, testimoni, dan FAQ, dengan registrasi pengguna yang terhubung ke API.",
      },
      "GKMI Ekaristi": {
        type: "Profil Organisasi",
        desc: "Website profil untuk GKMI Ekaristi Pringsewu yang menampilkan visi dan misi jemaat, kegiatan, serta informasi pelayanan dalam layout gelap yang elegan dengan tipografi serif.",
      },
    },
  },

  Contact: {
    title: "Mari Bekerja Sama",
    subtitle: "Hubungi saya",
    formTitle: "Kirim pesan",
    intro:
      "Punya proyek, posisi, atau sekadar ide yang ingin didiskusikan? Kirim pesan dan saya akan membalas secepatnya.",
  },

  Footer: {
    text: "Hak cipta dilindungi",
  },

  ui: {
    language: { switchTo: "Read in English", code: "EN" },
    theme: {
      toLight: "Ganti ke mode terang",
      toDark: "Ganti ke mode gelap",
      light: "Mode terang",
      dark: "Mode gelap",
    },
    nav: {
      skip: "Langsung ke konten",
      main: "Navigasi utama",
      home: "{name} — kembali ke atas",
      hire: "Rekrut Saya",
      open: "Buka menu",
      close: "Tutup menu",
    },
    hero: {
      greeting: "Halo, nama saya",
      portrait: "Foto {name}",
      scroll: "Gulir",
      scrollLabel: "Gulir ke layanan dan stack",
      sideNote: "Portofolio 2026",
    },
    skills: {
      serviceHint: "Ketuk layanan untuk memfilter stack",
      hint: "geser untuk melihat semua",
      more: "Selengkapnya tentang {name}",
      usedIn: "Dipakai di",
      openProject: "Buka detail proyek {name}",
      categories: { All: "Semua", Design: "Desain" },
    },
    journey: { eyebrow: "Perjalanan", highlights: "Pencapaian" },
    projects: {
      eyebrow: "Karya Pilihan",
      rail: "Karya pilihan",
      count: "{count} proyek",
      hint: "geser untuk melihat semua",
      comingSoon: "Screenshot segera hadir",
      openGallery: "Buka galeri {name}",
      viewGallery: "Lihat galeri",
      viewGalleryCount: "Lihat galeri ({count})",
      preview: "Pratinjau {name}",
      readMore: "Selengkapnya",
      readMoreLabel: "Baca deskripsi lengkap {name}",
      details: "Detail {name}",
      results: "Hasil",
      builtWith: "Dibangun dengan",
      close: "Tutup",
      gallery: "Galeri {name}",
      closeGallery: "Tutup galeri",
      zoomIn: "Perbesar",
      zoomOut: "Perkecil",
      resetZoom: "Atur ulang zoom",
      previous: "Gambar sebelumnya",
      next: "Gambar berikutnya",
      showImage: "Tampilkan gambar {number}",
      screenshot: "Screenshot {name} {number}",
      scrollHint: "gulir untuk melihat seluruh halaman",
      tallLabel: "Screenshot satu halaman penuh, gulir untuk melihat semuanya",
    },
    contact: {
      eyebrow: "Kontak",
      name: "Nama Anda",
      namePlaceholder: "Nama Anda",
      email: "Alamat email",
      emailPlaceholder: "anda@gmail.com",
      message: "Pesan",
      messagePlaceholder: "Ceritakan tentang proyek, posisi, atau ide Anda…",
      send: "Kirim pesan",
      sending: "Mengirim…",
      replyTime: "Biasanya membalas dalam satu atau dua hari.",
      copy: "Salin alamat email",
      copied: "Alamat email disalin",
      copyFailed: "Gagal menyalin. Gunakan link-nya saja.",
      sent: "Pesan terkirim, terima kasih sudah menghubungi!",
      sendFailed: "Pesan gagal dikirim. Silakan email saya langsung.",
    },
    footer: {
      nav: "Navigasi footer",
      navigate: "Navigasi",
      elsewhere: "Temukan saya di",
      backToTop: "Kembali ke atas",
    },
  },
};
