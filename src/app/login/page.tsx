'use client';

import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, getSession, signOut } from 'next-auth/react';
import { Laptop, Users, Settings, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

// Komponen Konten Login agar useSearchParams berjalan lancar di Next.js 15+
function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // --- STATE ---
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false); // Notifikasi Masuk

  // Cek parameter logout dari URL
  const logoutSuccess = searchParams.get('logout') === 'success';

  const handleLogin = async (targetRole: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    setLoginSuccess(false);
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        username: username,
        password: password,
        redirect: false,
      });

      if (result?.error) {
        setError('Username atau Password salah!');
        setLoading(false);
        return;
      }

      const session = await getSession();

      if (session?.user) {
        const actualRole = (session.user as any).role;

        if (actualRole !== targetRole) {
          setError(`Akses Ditolak! Akun Anda terdaftar sebagai ${actualRole}, bukan ${targetRole}.`);
          await signOut({ redirect: false });
          setLoading(false);
          return;
        }

        // --- TRIGGER NOTIFIKASI BERHASIL MASUK ---
        setLoginSuccess(true);

        // Beri jeda 1 detik agar user bisa melihat pesan sukses sebelum pindah halaman
        setTimeout(() => {
          router.refresh();
          if (actualRole === 'Admin') router.push('/dashboard/admin');
          else if (actualRole === 'Guru') router.push('/dashboard/guru');
          else if (actualRole === 'Wali') router.push('/dashboard/ortu');
        }, 1000);
      }
    } catch (err) {
      setError('Terjadi kesalahan sistem.');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-white lg:bg-gray-50">
      {/* SISI KIRI: BRANDING (Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#2D7A32] relative overflow-hidden items-center justify-center text-white p-12">
        <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-white/10 rounded-full" />
        <div className="relative z-10 text-center">
          <div className="relative bg-white/20 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-white/30 overflow-hidden">
            <Image src="/LogoCita.png" alt="Logo" fill className="object-cover" priority />
          </div>
          <h1 className="text-4xl font-bold tracking-wider mb-2">SIAKAD</h1>
          <h2 className="text-3xl font-semibold mb-6">SDIT Cita Mulia</h2>
          <p className="text-lg opacity-90">Sistem Informasi Akademik Terpadu</p>
        </div>
      </div>

      {/* SISI KANAN: FORM */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* 1. NOTIFIKASI BERHASIL MASUK (Prioritas Utama) */}
          {loginSuccess && (
            <div className="mb-6 p-4 rounded-xl bg-green-50 text-green-600 text-sm flex items-center gap-3 border border-green-100 animate-in fade-in zoom-in duration-300">
              <CheckCircle2 size={20} />
              <span className="font-bold">Anda berhasil masuk ke sistem. Mengalihkan...</span>
            </div>
          )}

          {/* 2. NOTIFIKASI BERHASIL KELUAR (Hanya muncul jika tidak sedang proses login sukses) */}
          {logoutSuccess && !loginSuccess && !error && (
            <div className="mb-6 p-4 rounded-xl bg-blue-50 text-blue-600 text-sm flex items-center gap-3 border border-blue-100 animate-in slide-in-from-top duration-500">
              <CheckCircle2 size={20} />
              <span className="font-semibold">Anda telah berhasil keluar dari sistem.</span>
            </div>
          )}

          {/* 3. NOTIFIKASI ERROR */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm flex items-start gap-3 border border-red-100 animate-pulse">
              <AlertCircle size={20} className="shrink-0" />
              <span className="font-semibold">{error}</span>
            </div>
          )}

          <div className="mb-10 text-center lg:text-left">
            <h3 className="text-3xl font-bold text-[#2D7A32]">Selamat Datang</h3>
            <p className="text-gray-500 text-sm">Silakan login untuk mengakses layanan akademik.</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => handleLogin('Guru', e)}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Username / NIP</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading || loginSuccess}
                className="w-full bg-gray-50 px-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#2D7A32] outline-none transition-all"
                placeholder="Masukkan ID Pengguna"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading || loginSuccess}
                className="w-full bg-gray-50 px-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#2D7A32] outline-none transition-all"
                placeholder="Masukkan Password"
                required
              />
            </div>

            <div className="pt-4 space-y-3">
              <button type="submit" disabled={loading || loginSuccess} className="w-full bg-[#2D7A32] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#25632a] transition-all disabled:opacity-50">
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Laptop size={20} />}
                {loading ? 'Memproses...' : 'Login sebagai Guru'}
              </button>

              <button
                type="button"
                onClick={() => handleLogin('Wali')}
                disabled={loading || loginSuccess}
                className="w-full bg-white border-2 border-[#2D7A32] text-[#2D7A32] py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-green-50 transition-all"
              >
                <Users size={20} /> Login sebagai Orang Tua
              </button>

              <button
                type="button"
                onClick={() => handleLogin('Admin')}
                disabled={loading || loginSuccess}
                className="w-full bg-white border-2 border-gray-800 text-gray-800 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-50 transition-all"
              >
                <Settings size={20} /> Login sebagai Admin (TU)
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Export utama dengan Suspense agar tidak error saat build (karena useSearchParams)
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-green-700 font-bold">Memuat...</div>}>
      <LoginContent />
    </Suspense>
  );
}
