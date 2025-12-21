import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Username dan Password wajib diisi');
        }

        // 1. Cari user di database berdasarkan username asli dari tabel users
        const user = await prisma.users.findUnique({
          where: { username: credentials.username },
        });

        // 2. Jika user tidak ditemukan, tampilkan log di terminal untuk memudahkan debug
        if (!user) {
          console.log('❌ Login Gagal: Username tidak ditemukan');
          return null;
        }

        // 3. Verifikasi password dengan membandingkan input user dan hash di database
        // Ini mengatasi error 401 karena sebelumnya pengecekan tidak mendukung bcrypt
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          console.log('❌ Login Gagal: Password tidak cocok');
          return null;
        }

        console.log('✅ Login Berhasil untuk:', user.username);

        // 4. Kirim data user ke session (menggunakan kolom id_user dan nama yang baru)
        return {
          id: user.id_user.toString(),
          name: user.nama,
          username: user.username,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    // Memasukkan role dan ID ke dalam Token agar bisa dibawa antar halaman
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    // Memasukkan role dari Token ke dalam Session agar bisa dibaca oleh useSession() di Frontend
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login', // Mengarahkan ke halaman login kustom Anda
  },
  session: {
    strategy: 'jwt', // Menggunakan strategi JWT untuk autentikasi yang lebih cepat
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
