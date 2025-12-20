import React from 'react';
import { LayoutDashboard, Star, Calendar, ClipboardList, FileDown, Mail, Settings, LogOut, Bell, User, TrendingUp, BookOpen, MessageCircle } from 'lucide-react';

// --- DEFINISI TIPE DATA (INTERFACES) ---
// Standar TypeScript untuk mendefinisikan bentuk props agar tidak error 'any'

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
}

interface StatCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  bgColor: string;
}

interface QuickAccessCardProps {
  icon: React.ReactNode;
  label: string;
  sub: string;
  iconColor: string;
  bgColor: string;
}

interface ScheduleRowProps {
  time: string;
  subject: string;
  teacher: string;
  status: string;
  statusColor: string;
}

export default function OrtuDashboard() {
  return (
    /* Container Utama: Menggunakan h-screen, w-full, dan overflow-hidden untuk mengunci layar utama */
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

        <nav className="flex-1 px-4 space-y-7 mt-4 overflow-y-auto">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-4">Utama</p>
            <div className="bg-[#2D7A32] text-white flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer shadow-lg shadow-green-100">
              <LayoutDashboard size={18} />
              <span className="font-semibold text-sm">Dashboard</span>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-4">Akademik Siswa</p>
            <ul className="space-y-1">
              <NavItem icon={<Star size={18} />} label="Lihat Nilai" />
              <NavItem icon={<ClipboardList size={18} />} label="Lihat Absensi" />
              <NavItem icon={<Calendar size={18} />} label="Jadwal Pelajaran" />
              <NavItem icon={<FileDown size={18} />} label="Unduh Rapor" />
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-4">Lainnya</p>
            <ul className="space-y-1">
              <NavItem icon={<Mail size={18} />} label="Pesan Masuk" />
              <NavItem icon={<Settings size={18} />} label="Pengaturan" />
            </ul>
          </div>
        </nav>

        <div className="p-6 border-t border-gray-50">
          <button className="flex items-center gap-3 text-red-500 font-bold text-sm hover:bg-red-50 w-full p-3 rounded-xl transition-all">
            <LogOut size={18} /> Keluar
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT (Scrollable area) --- */}
      <main className="flex-1 ml-64 p-8 h-full overflow-y-auto">
        {/* HEADER */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Wali Murid</h1>
            <p className="text-gray-400 text-sm">Selamat Datang, Ibu Siti Aminah.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-bold text-gray-800 text-sm">Ibu Siti Aminah</p>
              <span className="bg-green-100 text-[#2D7A32] text-[10px] px-2 py-1 rounded-full font-bold">Wali Murid: Ananda Yusuf</span>
            </div>
            <div className="w-10 h-10 bg-[#2D7A32] rounded-full flex items-center justify-center text-white font-bold">SA</div>
          </div>
        </header>

        {/* NOTIFIKASI PENGUMUMAN */}
        <div className="bg-white border-l-4 border-red-500 rounded-2xl p-6 shadow-sm mb-8 flex items-center gap-6">
          <div className="bg-red-50 p-3 rounded-full text-red-500 shadow-inner">
            <Bell size={24} />
          </div>
          <div>
            <h4 className="font-bold text-red-600 text-sm">Pengumuman Sekolah</h4>
            <p className="text-gray-500 text-xs mt-1">Pembagian rapor semester ganjil akan dilaksanakan secara digital pada tanggal 28. Mohon cek menu Unduh Rapor secara berkala.</p>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <StatCard value="95%" label="Kehadiran Siswa" icon={<User className="text-green-600" />} bgColor="bg-green-50" />
          <StatCard value="88.5" label="Rata-rata Nilai" icon={<TrendingUp className="text-blue-600" />} bgColor="bg-blue-50" />
          <StatCard value="3" label="Tugas Belum Dinilai" icon={<BookOpen className="text-orange-600" />} bgColor="bg-orange-50" />
          <StatCard value="1" label="Prestasi Semester Ini" icon={<Star className="text-purple-600" />} bgColor="bg-purple-50" />
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* TABEL JADWAL Harian Siswa */}
          <div className="col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-50">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-gray-800">Jadwal Ananda Yusuf Hari Ini</h3>
              <button className="text-[#2D7A32] text-xs font-bold hover:underline">Lihat Jadwal Penuh</button>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-[10px] uppercase tracking-widest border-b border-gray-50">
                  <th className="pb-5 font-bold">Waktu</th>
                  <th className="pb-5 font-bold">Mata Pelajaran</th>
                  <th className="pb-5 font-bold">Guru Pengampu</th>
                  <th className="pb-5 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <ScheduleRow time="07:30 - 09:00" subject="Matematika" teacher="Bpk. Ahmad Fauzi" status="Selesai" statusColor="text-green-600 bg-green-50" />
                <ScheduleRow time="09:30 - 11:00" subject="IPA Terpadu" teacher="Ibu Rina" status="Sedang Berlangsung" statusColor="text-blue-600 bg-blue-50" />
                <ScheduleRow time="13:00 - 14:30" subject="Bahasa Inggris" teacher="Mr. John" status="Akan Datang" statusColor="text-gray-400 bg-gray-50" />
              </tbody>
            </table>
          </div>

          {/* AKSES CEPAT */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-50">
            <h3 className="font-bold text-gray-800 mb-8">Akses Cepat</h3>
            <div className="grid grid-cols-2 gap-4">
              <QuickAccessCard icon={<Star size={20} />} label="Nilai" sub="Lihat Transkrip" iconColor="text-yellow-500" bgColor="bg-yellow-50" />
              <QuickAccessCard icon={<ClipboardList size={20} />} label="Absensi" sub="Rekap Kehadiran" iconColor="text-green-500" bgColor="bg-green-50" />
              <QuickAccessCard icon={<FileDown size={20} />} label="Rapor" sub="Unduh PDF" iconColor="text-blue-500" bgColor="bg-blue-50" />
              <QuickAccessCard icon={<MessageCircle size={20} />} label="Chat" sub="Wali Kelas" iconColor="text-teal-500" bgColor="bg-teal-50" />
            </div>
          </div>
        </div>

        {/* Tambahan padding bawah agar konten tidak terpotong saat scroll akhir */}
        <div className="h-20"></div>
      </main>
    </div>
  );
}

// --- SUB-KOMPONEN DENGAN TIPE DATA (FIXED) ---

function NavItem({ icon, label }: NavItemProps) {
  return (
    <li className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-[#2D7A32] hover:bg-green-50 rounded-xl cursor-pointer transition-all group">
      <span className="group-hover:scale-110 transition-transform">{icon}</span>
      <span className="font-semibold text-sm">{label}</span>
    </li>
  );
}

function StatCard({ value, label, icon, bgColor }: StatCardProps) {
  return (
    <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-50 flex justify-between items-start">
      <div>
        <h2 className="text-3xl font-black text-gray-800 mb-2">{value}</h2>
        <p className="text-gray-400 text-xs font-bold">{label}</p>
      </div>
      <div className={`p-3 ${bgColor} rounded-xl`}>{icon}</div>
    </div>
  );
}

function QuickAccessCard({ icon, label, sub, iconColor, bgColor }: QuickAccessCardProps) {
  return (
    <div className="bg-gray-50/50 p-4 rounded-2xl hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100 transition-all cursor-pointer group">
      <div className={`w-10 h-10 ${bgColor} ${iconColor} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>{icon}</div>
      <h4 className="text-xs font-black text-gray-800">{label}</h4>
      <p className="text-[9px] text-gray-400 font-bold">{sub}</p>
    </div>
  );
}

function ScheduleRow({ time, subject, teacher, status, statusColor }: ScheduleRowProps) {
  return (
    <tr className="border-b border-gray-50 last:border-0">
      <td className="py-6 text-gray-500 font-semibold text-xs">{time}</td>
      <td className="py-6 font-bold text-gray-800">{subject}</td>
      <td className="py-6 text-gray-500 text-xs font-semibold">{teacher}</td>
      <td className="py-6">
        <span className={`${statusColor} px-3 py-1.5 rounded-xl font-black text-[9px]`}>{status}</span>
      </td>
    </tr>
  );
}
