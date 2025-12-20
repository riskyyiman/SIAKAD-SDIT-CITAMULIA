'use client';

import React, { useState } from 'react';
import { LayoutDashboard, Users, MonitorPlay, BookOpen, UserCog, Printer, Mail, Settings, LogOut, AlertTriangle } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-full bg-[#FFF5F5] overflow-hidden font-sans">
      {/* --- SIDEBAR (Fixed) --- */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full shadow-sm z-50">
        <div className="p-6 flex items-center gap-2 text-[#2D7A32] font-bold text-xl">
          <div className="bg-[#2D7A32] p-1.5 rounded-lg text-white">
            <LayoutDashboard size={20} />
          </div>
          <div>
            <h1 className="leading-none text-lg">SIAKAD</h1>
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-tighter">SDIT Cita Mulia</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-6 mt-2 overflow-y-auto">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-3">Utama</p>
            <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" href="/dashboard/admin" active={pathname === '/dashboard/admin'} />
          </div>

          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-3">Administrasi</p>
            <ul className="space-y-1">
              <NavItem icon={<Users size={18} />} label="Kelola Siswa" href="/dashboard/admin/siswa" active={pathname === '/dashboard/admin/siswa'} />
              <NavItem icon={<MonitorPlay size={18} />} label="Kelola Guru" href="/dashboard/admin/guru" active={pathname === '/dashboard/admin/guru'} />
              <NavItem icon={<BookOpen size={18} />} label="Kelola Mapel & Kelas" href="/dashboard/admin/mapel" active={pathname === '/dashboard/admin/mapel'} />
              <NavItem icon={<UserCog size={18} />} label="Kelola Akun" href="/dashboard/admin/akun" active={pathname === '/dashboard/admin/akun'} />
              <NavItem icon={<Printer size={18} />} label="Cetak Laporan" href="/dashboard/admin/laporan" active={pathname === '/dashboard/admin/laporan'} />
            </ul>
          </div>
        </nav>

        <div className="p-6 border-t border-gray-50">
          <button onClick={() => setShowLogoutModal(true)} className="flex items-center gap-3 text-red-500 font-bold text-sm hover:bg-red-50 w-full p-3 rounded-xl transition-all">
            <LogOut size={18} /> Keluar
          </button>
        </div>
      </aside>

      {/* --- KONTEN AREA --- */}
      <main className="flex-1 ml-64 h-full overflow-y-auto">{children}</main>

      {/* MODAL LOGOUT */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowLogoutModal(false)} />
          <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center">
            <AlertTriangle size={40} className="text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Konfirmasi Keluar</h3>
            <p className="text-gray-500 text-sm mb-8">Apakah Anda yakin ingin mengakhiri sesi administrator?</p>
            <div className="flex gap-4">
              <button onClick={() => setShowLogoutModal(false)} className="flex-1 py-4 border rounded-2xl font-bold text-gray-500">
                Batal
              </button>
              <button onClick={() => signOut()} className="flex-1 py-4 rounded-2xl font-bold text-white bg-red-500 shadow-lg shadow-red-100">
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NavItem({ icon, label, href, active }: { icon: React.ReactNode; label: string; href: string; active: boolean }) {
  return (
    <li>
      <Link href={href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${active ? 'bg-[#2D7A32] text-white shadow-lg' : 'text-gray-400 hover:text-[#2D7A32] hover:bg-green-50'}`}>
        <span className="group-hover:scale-110 transition-transform">{icon}</span>
        <span className="font-semibold text-sm">{label}</span>
      </Link>
    </li>
  );
}
