# CRMTS Backend

Sistem backend untuk CRM WhatsApp Marketing ini dibangun menggunakan Node.js, Express, dan Prisma.

## Persiapan Sertifikasi
1.  **Instalasi Dependensi**: Buka terminal di folder ini dan jalankan:
    ```bash
    npm install
    ```
2.  **Konfigurasi Database**:
    - Pastikan PostgreSQL sudah terinstal dan berjalan.
    - Edit file `.env` dan sesuaikan `DATABASE_URL` dengan kredensial PostgreSQL Anda.
3.  **Setup Database**:
    ```bash
    npx prisma migrate dev --name init
    npx prisma generate
    ```

## Menjalankan Aplikasi
- **Mode Development**: `npm run dev`
- **Mode Produksi**: `npm run build` lalu `npm start`

## Fitur Utama
- **Auth & RBAC**: Login dengan JWT, membedakan role MANAGER dan STAFF.
- **Lead Management**: API untuk list dan update status lead.
- **AI Chatbot**: Integrasi dengan Gemini API untuk membalas pesan secara otomatis.
- **WA Gateway**: Mendukung pengiriman pesan melalui gateway pihak ketiga atau Official API.

## Pengguna default (Simulasi)
- **Manager**: `admin@crmts.com` / `admin123`
- **Staff**: `staff@crmts.com` / `staff123`
