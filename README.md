# Portfolio Dewi Aidah

## Struktur
- `index.html` — struktur halaman
- `style.css` — desain responsif dan tema gelap/terang
- `script.js` — tombol tema, typing effect, reveal, navbar aktif
- `assets/images/dewi-photo.jpg` — foto profil
- `bootstrap/css/bootstrap.min.css` — Bootstrap CSS lokal
- `bootstrap/js/bootstrap.bundle.min.js` — Bootstrap JS lokal
- `bootstrap-icons/font/bootstrap-icons.min.css` — Bootstrap Icons lokal beserta folder `fonts`

## Menyiapkan Bootstrap lokal
Folder library di ZIP ini hanya struktur folder. Unduh Bootstrap 5 dari https://getbootstrap.com/ lalu:
1. Salin `bootstrap.min.css` ke `bootstrap/css/`.
2. Salin `bootstrap.bundle.min.js` ke `bootstrap/js/`.

Unduh Bootstrap Icons dari https://icons.getbootstrap.com/ lalu salin `bootstrap-icons.min.css` ke `bootstrap-icons/font/` dan folder `fonts` ke `bootstrap-icons/font/fonts/` (sesuaikan path relatif CSS bila diperlukan).

## Menjalankan
Buka folder ini di VS Code dan jalankan `index.html` dengan Live Server.

## Catatan personalisasi
- Masukkan foto profil sebagai `assets/images/dewi-photo.jpg`.
- Ganti link sosial, email, repository, serta prototype dengan link milikmu.
- Bagian organisasi, sertifikat, dan kegiatan masih berupa placeholder.
- Tema awal gelap. Tombol ikon matahari/bulan di navbar mengganti tema dan menyimpan preferensi di browser.
- Google Fonts diambil dari internet; font fallback akan digunakan jika offline.
