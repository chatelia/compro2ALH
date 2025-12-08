import { ChatStep } from '../types';

export const chatFlow: { [key: string]: ChatStep } = {
  main: {
    message: "Halo! Selamat datang di Ren's Sound\n**Elevate Your Events**\n\nPilih menu di bawah untuk informasi lebih lanjut:\n\n1. Paket Sound System\n2. Peralatan Lain (Drum, Lighting, dll)\n3. Cara Pemesanan\n4. Area Layanan & FAQ\n0. Hubungi Admin via WhatsApp",
    options: {
      '1': 'menu_1',
      '2': 'menu_2',
      '3': 'menu_3',
      '4': 'menu_4',
      '0': 'whatsapp_cta',
      '#': 'main'
    },
    actions: [
      { label: '1. Paket Sound System', value: '1' },
      { label: '2. Peralatan Lain', value: '2' },
      { label: '3. Cara Pemesanan', value: '3' },
      { label: '4. Area Layanan & FAQ', value: '4' },
      { label: '0. Hubungi Admin', value: '0' },
    ]
  },
  
  // Level 2: Sound System
  menu_1: {
    message: "**PAKET SOUND SYSTEM**\n\nPilih paket yang ingin Anda ketahui:\n\n1. Paket 1000W - Rp 850.000\n2. Paket 2000W - Rp 1.300.000\n3. Paket 3000W - Rp 2.200.000\n4. Paket Full Event\n\n# Kembali ke Menu Utama\n0. Hubungi Admin",
    options: {
      '1': 'detail_1_1',
      '2': 'detail_1_2',
      '3': 'detail_1_3',
      '4': 'detail_1_4',
      '#': 'main',
      '0': 'whatsapp_cta'
    },
    actions: [
      { label: '1. 1000W (Rp 850k)', value: '1' },
      { label: '2. 2000W (Rp 1.3m)', value: '2' },
      { label: '3. 3000W (Rp 2.2m)', value: '3' },
      { label: '4. Full Event', value: '4' },
      { label: '# Menu Utama', value: '#' },
    ]
  },

  // Level 3: Sound System Details
  detail_1_1: {
    message: "**PAKET 1000W - Rp 850.000**\n\nInclude:\n- 2x Speaker Aktif 500W\n- 1x Mixer\n- 2x Mic Wireless\n- Kabel & Aksesoris Lengkap\n- Crew & Setup\n\nCatatan: Harga dapat berubah sesuai lokasi dan durasi acara.\n\nButuh info lebih detail atau booking?\n1. Hubungi Admin via WhatsApp\n2. Lihat Paket Lain\n# Kembali ke Menu Utama",
    options: {
      '1': 'whatsapp_cta',
      '2': 'menu_1',
      '#': 'main'
    },
    actions: [
      { label: '1. Hubungi Admin', value: '1' },
      { label: '2. Lihat Paket Lain', value: '2' },
      { label: '# Menu Utama', value: '#' }
    ]
  },
  detail_1_2: {
    message: "**PAKET 2000W - Rp 1.300.000**\n\nInclude:\n- 4x Speaker Aktif 500W\n- 1x Mixer\n- 3x Mic Wireless\n- Kabel & Aksesoris Lengkap\n- Crew & Setup\n\nCatatan: Harga dapat berubah sesuai lokasi dan durasi acara.\n\nButuh info lebih detail atau booking?\n1. Hubungi Admin via WhatsApp\n2. Lihat Paket Lain\n# Kembali ke Menu Utama",
    options: {
      '1': 'whatsapp_cta',
      '2': 'menu_1',
      '#': 'main'
    },
    actions: [
      { label: '1. Hubungi Admin', value: '1' },
      { label: '2. Lihat Paket Lain', value: '2' },
      { label: '# Menu Utama', value: '#' }
    ]
  },
  detail_1_3: {
    message: "**PAKET 3000W - Rp 2.200.000**\n\nInclude:\n- 6x Speaker Aktif 500W\n- 1x Mixer Professional\n- 4x Mic Wireless\n- Kabel & Aksesoris Lengkap\n- Crew & Setup\n\nCatatan: Harga dapat berubah sesuai lokasi dan durasi acara.\n\nButuh info lebih detail atau booking?\n1. Hubungi Admin via WhatsApp\n2. Lihat Paket Lain\n# Kembali ke Menu Utama",
    options: {
      '1': 'whatsapp_cta',
      '2': 'menu_1',
      '#': 'main'
    },
    actions: [
      { label: '1. Hubungi Admin', value: '1' },
      { label: '2. Lihat Paket Lain', value: '2' },
      { label: '# Menu Utama', value: '#' }
    ]
  },
  detail_1_4: {
    message: "**PAKET FULL EVENT**\n\nPaket lengkap untuk event skala besar:\n- Sound System Set Band (2000W-3000W)\n- Lighting Professional\n- Panggung/Stage\n- Crew & Operator FOH\n\nHarga disesuaikan dengan kebutuhan spesifik acara Anda.\n\nUntuk detail dan konsultasi:\n1. Hubungi Admin via WhatsApp\n2. Lihat Paket Sound Lainnya\n# Kembali ke Menu Utama",
    options: {
      '1': 'whatsapp_cta',
      '2': 'menu_1',
      '#': 'main'
    },
    actions: [
      { label: '1. Hubungi Admin', value: '1' },
      { label: '2. Paket Lain', value: '2' },
      { label: '# Menu Utama', value: '#' }
    ]
  },

  // Level 2: Equipment
  menu_2: {
    message: "**PERALATAN LAIN**\n\nPilih kategori:\n\n1. Drum Set (Acoustic/Electric)\n2. Lighting Parled\n3. Audio Equipment (Mixer, Mic, Speaker)\n4. Lain-lain (HT, Operator FOH)\n\n# Kembali ke Menu Utama\n0. Hubungi Admin",
    options: {
      '1': 'detail_2_1',
      '2': 'detail_2_2',
      '3': 'detail_2_3',
      '4': 'detail_2_4',
      '#': 'main',
      '0': 'whatsapp_cta'
    },
    actions: [
      { label: '1. Drum Set', value: '1' },
      { label: '2. Lighting', value: '2' },
      { label: '3. Audio Equipment', value: '3' },
      { label: '4. Lain-lain', value: '4' },
      { label: '# Menu Utama', value: '#' }
    ]
  },

  // Equipment Details
  detail_2_1: {
    message: "**DRUM SET**\n\nPilih jenis drum:\n\n1. Drum Acoustic - Rp 500.000\n(Full set dengan hardware lengkap)\n\n2. Drum Electric - Rp 250.000\n(Include modul & stand)\n\nCatatan: Harga dapat berubah sesuai lokasi dan durasi acara.\n\nPilih opsi:\n1. Hubungi Admin untuk Booking\n2. Kembali ke Peralatan Lain\n# Kembali ke Menu Utama",
    options: {
      '1': 'whatsapp_cta',
      '2': 'menu_2',
      '#': 'main'
    },
    actions: [
      { label: '1. Booking', value: '1' },
      { label: '2. Peralatan Lain', value: '2' },
      { label: '# Menu Utama', value: '#' }
    ]
  },
  detail_2_2: {
    message: "**LIGHTING PARLED**\n\nPilihan paket lighting:\n\n- Per Unit: Rp 125.000/unit\n- 1 Set Lighting (8 unit + operator): Rp 500.000\n\nInclude setup dan operator untuk paket set.\nCatatan: Harga dapat berubah sesuai lokasi dan durasi acara.\n\nPilih opsi:\n1. Hubungi Admin untuk Booking\n2. Kembali ke Peralatan Lain\n# Kembali ke Menu Utama",
    options: {
      '1': 'whatsapp_cta',
      '2': 'menu_2',
      '#': 'main'
    },
    actions: [
      { label: '1. Booking', value: '1' },
      { label: '2. Peralatan Lain', value: '2' },
      { label: '# Menu Utama', value: '#' }
    ]
  },
  detail_2_3: {
    message: "**AUDIO EQUIPMENT**\n\nHarga rental per item:\n\n- Mic Wireless: Rp 80.000\n- Mixer: Rp 150.000 - Rp 350.000\n- Speaker (per unit): Hubungi admin\n\nSemua peralatan dalam kondisi prima dan terawat.\n\nPilih opsi:\n1. Hubungi Admin untuk Info Detail\n2. Kembali ke Peralatan Lain\n# Kembali ke Menu Utama",
    options: {
      '1': 'whatsapp_cta',
      '2': 'menu_2',
      '#': 'main'
    },
    actions: [
      { label: '1. Info Detail', value: '1' },
      { label: '2. Peralatan Lain', value: '2' },
      { label: '# Menu Utama', value: '#' }
    ]
  },
  detail_2_4: {
    message: "**PERALATAN LAIN**\n\nLayanan tambahan:\n\n- Hand Talkie (HT): Rp 10.000/unit\n- Jasa Operator FOH: Include dalam paket atau available terpisah\n- Crew & Setup: Include dalam semua paket\n\nUntuk kombinasi peralatan atau kebutuhan khusus, hubungi admin untuk konsultasi.\n\nPilih opsi:\n1. Hubungi Admin\n2. Kembali ke Peralatan Lain\n# Kembali ke Menu Utama",
    options: {
      '1': 'whatsapp_cta',
      '2': 'menu_2',
      '#': 'main'
    },
    actions: [
      { label: '1. Hubungi Admin', value: '1' },
      { label: '2. Peralatan Lain', value: '2' },
      { label: '# Menu Utama', value: '#' }
    ]
  },

  // Level 2: Booking Info
  menu_3: {
    message: "**CARA PEMESANAN**\n\nProses pemesanan di Ren's Sound:\n1. Hubungi admin via WhatsApp\n2. Informasikan tanggal dan lokasi acara Anda\n3. Pilih paket yang dibutuhkan\n4. Admin akan memberikan penawaran harga final\n5. Invoice/MoU dikirim setelah deal\n6. Pembayaran (DP opsional)\n7. Event berjalan dengan tim profesional kami\n8. Pelunasan setelah acara selesai\n\nSiap melakukan booking?\n1. Hubungi Admin Sekarang\n2. Kembali ke Menu Utama",
    options: {
      '1': 'whatsapp_cta',
      '2': 'main',
      '#': 'main'
    },
    actions: [
      { label: '1. Hubungi Admin', value: '1' },
      { label: '2. Menu Utama', value: '2' }
    ]
  },

  // Level 2: FAQ
  menu_4: {
    message: "**AREA LAYANAN & FAQ**\n\n1. Area Layanan (Cakupan)\n2. FAQ Umum\n3. Durasi & Ketentuan Sewa\n\n# Kembali ke Menu Utama\n0. Hubungi Admin",
    options: {
      '1': 'detail_4_1',
      '2': 'detail_4_2',
      '3': 'detail_4_3',
      '#': 'main',
      '0': 'whatsapp_cta'
    },
    actions: [
      { label: '1. Area Layanan', value: '1' },
      { label: '2. FAQ Umum', value: '2' },
      { label: '3. Durasi & Ketentuan', value: '3' },
      { label: '# Menu Utama', value: '#' }
    ]
  },

  detail_4_1: {
    message: "**AREA LAYANAN REN'S SOUND**\n\nArea yang dilayani:\n- Seluruh Area Kota Bandung\n- Kabupaten Bandung\n- Kota Cimahi\n\nUntuk area di luar jangkauan di atas, silakan konsultasi dengan admin kami.\n\nPilih opsi:\n1. Hubungi Admin\n2. Kembali ke FAQ\n# Kembali ke Menu Utama",
    options: {
      '1': 'whatsapp_cta',
      '2': 'menu_4',
      '#': 'main'
    },
    actions: [
      { label: '1. Hubungi Admin', value: '1' },
      { label: '2. Kembali ke FAQ', value: '2' },
      { label: '# Menu Utama', value: '#' }
    ]
  },
  detail_4_2: {
    message: "**FAQ UMUM**\n\nQ: Apakah harga sudah termasuk operator?\nA: Ya, semua paket include crew dan setup.\n\nQ: Berapa lama durasi sewa standar?\nA: Standar 6-8 jam, dapat disesuaikan dengan kebutuhan.\n\nQ: Apakah tersedia paket custom?\nA: Ya, kami melayani paket custom sesuai kebutuhan event Anda.\n\nQ: Bagaimana cara cek ketersediaan tanggal?\nA: Hubungi admin via WhatsApp untuk cek tanggal yang Anda inginkan.\n\nPilih opsi:\n1. Hubungi Admin\n2. Kembali ke FAQ Menu\n# Kembali ke Menu Utama",
    options: {
      '1': 'whatsapp_cta',
      '2': 'menu_4',
      '#': 'main'
    },
    actions: [
      { label: '1. Hubungi Admin', value: '1' },
      { label: '2. Kembali ke FAQ', value: '2' },
      { label: '# Menu Utama', value: '#' }
    ]
  },
  detail_4_3: {
    message: "**DURASI & KETENTUAN SEWA**\n\nDurasi Sewa:\n- Standar: 6-8 jam\n- Dapat disesuaikan dengan kebutuhan acara\n- Overtime dikenakan biaya tambahan\n\nKetentuan Umum:\n- Setup dilakukan H-1 atau H-day\n- Pembayaran: DP opsional, pelunasan setelah acara\n\nPilih opsi:\n1. Hubungi Admin\n2. Kembali ke FAQ Menu\n# Kembali ke Menu Utama",
    options: {
      '1': 'whatsapp_cta',
      '2': 'menu_4',
      '#': 'main'
    },
    actions: [
      { label: '1. Hubungi Admin', value: '1' },
      { label: '2. Kembali ke FAQ', value: '2' },
      { label: '# Menu Utama', value: '#' }
    ]
  },

  // CTA
  whatsapp_cta: {
    message: "Terima kasih!\n\nSilakan hubungi admin kami untuk booking dan konsultasi lebih lanjut:\n\nTim Ren's Sound siap membantu mewujudkan event terbaik Anda!\n\n# Kembali ke Menu Utama",
    options: {
      '#': 'main'
    },
    isEndpoint: true,
    actions: [
      { label: 'Chat via WhatsApp', value: 'WA_LINK' },
      { label: '# Menu Utama', value: '#' }
    ]
  }
};