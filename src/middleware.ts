import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // 1. Proteksi halaman Admin: Hanya boleh diakses role 'Admin'
    if (path.startsWith('/dashboard/admin') && token?.role !== 'Admin') {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // 2. Proteksi halaman Guru: Hanya boleh diakses role 'Guru'
    if (path.startsWith('/dashboard/guru') && token?.role !== 'Guru') {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // 3. Proteksi halaman Ortu: Hanya boleh diakses role 'Wali'
    if (path.startsWith('/dashboard/ortu') && token?.role !== 'Wali') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  },
  {
    callbacks: {
      // Pastikan pengguna sudah login (token harus ada)
      authorized: ({ token }) => !!token,
    },
  }
);

// Tentukan folder mana saja yang akan diproteksi oleh middleware ini
export const config = {
  matcher: ['/dashboard/:path*'],
};
