'use client';

import React, { useState } from 'react';
import { LayoutDashboard, Users, GraduationCap, BookOpen, UserCog, Printer, Mail, Settings, LogOut, Server, Database, Lock, FileText, MonitorPlay, School, AlertTriangle, X } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link'; // Import Link untuk navigasi

// --- DEFINISI TIPE DATA (INTERFACES) ---

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string; // Tambahkan ini agar tidak error TypeScript
}

interface StatCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}

interface MenuCardProps {
  icon: React.ReactNode;
  label: string;
  href?: string; // Opsional untuk MenuCard
}

interface LogRowProps {
  time: string;
  user: string;
  role: string;
  activity: string;
  status: string;
}

export default function AdminDashboard() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    /* Container Utama: Mengunci layar penuh */
    <div className="flex h-screen w-full bg-[#FFF5F5] overflow-hidden font-sans">
      {/* --- SIDEBAR (Fixed Layout) --- */}
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
          {/* Menu Utama */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-3">Utama</p>
            <Link href="/dashboard/admin" className="bg-[#2D7A32] text-white flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer shadow-lg shadow-green-100 transition-all">
              <LayoutDashboard size={18} />
              <span className="font-semibold text-sm">Dashboard</span>
            </Link>
          </div>

          {/* Menu Administrasi */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-3">Administrasi</p>
            <ul className="space-y-1">
              <NavItem icon={<Users size={18} />} label="Kelola Siswa" href="/dashboard/admin/siswa" />
              <NavItem icon={<MonitorPlay size={18} />} label="Kelola Guru" href="/dashboard/admin/guru" />
              <NavItem icon={<BookOpen size={18} />} label="Kelola Mapel & Kelas" href="/dashboard/admin/mapel" />
              <NavItem icon={<UserCog size={18} />} label="Kelola Akun" href="/dashboard/admin/akun" />
              <NavItem icon={<Printer size={18} />} label="Cetak Laporan" href="/dashboard/admin/laporan" />
            </ul>
          </div>

          {/* Menu Lainnya */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-3">Lainnya</p>
            <ul className="space-y-1">
              <NavItem icon={<Mail size={18} />} label="Pesan Masuk" href="/dashboard/admin/pesan" />
              <NavItem icon={<Settings size={18} />} label="Pengaturan Sistem" href="/dashboard/admin/settings" />
            </ul>
          </div>
        </nav>

        <div className="p-6 border-t border-gray-50">
          <button onClick={() => setShowLogoutModal(true)} className="flex items-center gap-3 text-red-500 font-bold text-sm hover:bg-red-50 w-full p-3 rounded-xl transition-all">
            <LogOut size={18} /> Keluar
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT (Scrollable) --- */}
      <main className="flex-1 ml-64 p-8 h-full overflow-y-auto">
        {/* HEADER */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Tata Usaha</h1>
            <p className="text-gray-400 text-sm">Selamat Datang di Panel Administrator.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-bold text-gray-800 text-sm">Staff Tata Usaha</p>
              <span className="bg-green-100 text-[#2D7A32] text-[10px] px-2 py-1 rounded-full font-bold">Administrator</span>
            </div>
            <div className="w-10 h-10 bg-[#2D7A32] rounded-full flex items-center justify-center text-white font-bold text-sm">TU</div>
          </div>
        </header>

        {/* SYSTEM STATUS BANNER */}
        <div className="bg-white border-l-[6px] border-red-500 rounded-2xl p-6 shadow-sm mb-8 flex items-center gap-6">
          <div className="bg-red-50 p-3 rounded-full text-red-500 shadow-inner">
            <Server size={24} />
          </div>
          <div>
            <h4 className="font-bold text-red-600 text-sm">System Status: Normal</h4>
            <p className="text-gray-500 text-xs mt-1">Server berjalan normal. Backup database terjadwal pukul 00:00 WIB. Tidak ada kendala teknis yang dilaporkan.</p>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard value="450" label="Total Siswa Aktif" icon={<GraduationCap size={24} />} bgColor="bg-green-50" iconColor="text-green-600" />
          <StatCard value="35" label="Total Guru" icon={<MonitorPlay size={24} />} bgColor="bg-blue-50" iconColor="text-blue-600" />
          <StatCard value="12" label="Total Kelas" icon={<School size={24} />} bgColor="bg-orange-50" iconColor="text-orange-600" />
          <StatCard value="3" label="Admin / Staff" icon={<Users size={24} />} bgColor="bg-purple-50" iconColor="text-purple-600" />
        </div>

        {/* MENU CEPAT */}
        <div className="mb-10">
          <h3 className="font-bold text-gray-800 mb-6 text-lg">Menu Cepat</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MenuCard icon={<Users size={32} />} label="Kelola Data Siswa" href="/dashboard/admin/siswa" />
            <MenuCard icon={<MonitorPlay size={32} />} label="Kelola Data Guru" href="/dashboard/admin/guru" />
            <MenuCard icon={<Lock size={32} />} label="Reset Password / Akun" href="/dashboard/admin/akun" />
            <MenuCard icon={<FileText size={32} />} label="Laporan Akademik" href="/dashboard/admin/laporan" />
          </div>
        </div>

        {/* LOG AKTIVITAS SISTEM TERBARU */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800">Log Aktivitas Sistem Terbaru</h3>
            <button className="text-[#2D7A32] text-xs font-bold hover:underline">Lihat Semua</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-[10px] uppercase tracking-widest border-b border-gray-100">
                  <th className="pb-4 font-bold w-32">Waktu</th>
                  <th className="pb-4 font-bold w-48">User</th>
                  <th className="pb-4 font-bold">Aktivitas</th>
                  <th className="pb-4 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <LogRow time="10:45 WIB" user="Ahmad Fauzi" role="(Guru)" activity="Input Nilai UTS Kelas 5A - Matematika" status="Berhasil" />
                <LogRow time="10:30 WIB" user="Siti Aminah" role="(Ortu)" activity="Login ke Sistem" status="Berhasil" />
                <LogRow time="09:15 WIB" user="Admin TU" role="" activity="Update Data Siswa (NIS 2301005)" status="Berhasil" />
                <LogRow time="08:00 WIB" user="System" role="" activity="Auto-Backup Database Harian" status="Selesai" />
              </tbody>
            </table>
          </div>
        </div>

        {/* Padding Bawah */}
        <div className="h-20"></div>
      </main>

      {/* --- MODAL KONFIRMASI LOGOUT --- */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowLogoutModal(false)} />
          <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in zoom-in duration-300 text-center">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <AlertTriangle size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Konfirmasi Keluar</h3>
            <p className="text-gray-500 text-sm mb-8">Apakah Anda yakin ingin mengakhiri sesi ini? Anda harus login kembali untuk mengakses data.</p>
            <div className="flex gap-4">
              <button onClick={() => setShowLogoutModal(false)} className="flex-1 py-4 px-6 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all border border-gray-100">
                Batal
              </button>
              <button onClick={() => signOut({ callbackUrl: '/login?logout=success' })} className="flex-1 py-4 px-6 rounded-2xl font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-100 transition-all">
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- KOMPONEN PENDUKUNG (HELPER COMPONENTS) ---

function NavItem({ icon, label, href }: NavItemProps) {
  return (
    <li>
      <Link href={href} className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-[#2D7A32] hover:bg-green-50 rounded-xl cursor-pointer transition-all group">
        <span className="group-hover:scale-110 transition-transform">{icon}</span>
        <span className="font-semibold text-sm">{label}</span>
      </Link>
    </li>
  );
}

function StatCard({ value, label, icon, bgColor, iconColor }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex justify-between items-start hover:shadow-md transition-shadow">
      <div>
        <h2 className="text-3xl font-black text-gray-800 mb-2">{value}</h2>
        <p className="text-gray-400 text-xs font-bold">{label}</p>
      </div>
      <div className={`p-3 ${bgColor} ${iconColor} rounded-xl`}>{icon}</div>
    </div>
  );
}

function MenuCard({ icon, label, href }: MenuCardProps) {
  const content = (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50 flex flex-col items-center justify-center text-center hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group h-full">
      <div className="w-16 h-16 bg-green-50 text-[#2D7A32] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#2D7A32] group-hover:text-white transition-colors">{icon}</div>
      <h4 className="font-bold text-gray-800 text-sm">{label}</h4>
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}

function LogRow({ time, user, role, activity, status }: LogRowProps) {
  return (
    <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
      <td className="py-5 text-gray-500 text-xs font-medium">{time}</td>
      <td className="py-5 font-bold text-gray-800 text-sm">
        {user} <span className="text-gray-400 font-normal text-xs">{role}</span>
      </td>
      <td className="py-5 text-gray-600 text-sm">{activity}</td>
      <td className="py-5 text-right">
        <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase">{status}</span>
      </td>
    </tr>
  );
}
