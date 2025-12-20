import React from 'react';
import { LayoutDashboard, Users, FileEdit, ClipboardList, Printer, Calendar, Mail, Settings, LogOut, Bell } from 'lucide-react';

export default function TeacherDashboard() {
  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {/* SIDEBAR  */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2 text-[#2D7A32] font-bold text-xl">
            <div className="bg-[#2D7A32] p-1 rounded-lg text-white">
              <LayoutDashboard size={20} />
            </div>
            SIAKAD <br />
            <span className="text-xs block -mt-1 font-medium text-gray-400">SDIT Cita Mulia</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-8 overflow-y-auto">
          {/* Menu Utama */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-4">Utama</p>
            <div className="bg-[#2D7A32] text-white flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer shadow-lg shadow-green-100">
              <LayoutDashboard size={20} />
              <span className="font-semibold text-sm">Dashboard</span>
            </div>
          </div>

          {/* Menu Akademik  */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-4">Akademik</p>
            <ul className="space-y-2">
              <NavItem icon={<Users size={20} />} label="Input Absensi" />
              <NavItem icon={<FileEdit size={20} />} label="Input Nilai" />
              <NavItem icon={<ClipboardList size={20} />} label="Data Penilaian" />
              <NavItem icon={<Printer size={20} />} label="Generate Rapor" />
            </ul>
          </div>

          {/* Menu Lainnya */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-4">Lainnya</p>
            <ul className="space-y-2">
              <NavItem icon={<Calendar size={20} />} label="Jadwal Mengajar" />
              <NavItem icon={<Mail size={20} />} label="Pesan Masuk" />
              <NavItem icon={<Settings size={20} />} label="Pengaturan" />
            </ul>
          </div>
        </nav>

        {/* Logout [cite: 548] */}
        <div className="p-6 mt-auto">
          <button className="flex items-center gap-3 text-red-500 font-semibold text-sm hover:bg-red-50 w-full p-3 rounded-xl transition-all">
            <LogOut size={20} />
            Keluar
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        {/* HEADER [cite: 395] */}
        <header className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Ringkasan Akademik</h1>
            <p className="text-gray-400 text-sm">Halo Pak Bahlil ini ringkasan aktivitas hari ini.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-bold text-gray-800 text-sm">Bpk. Ahmad Fauzi</p>
              <span className="bg-green-100 text-[#2D7A32] text-[10px] px-2 py-1 rounded-full font-bold">Wali Kelas 5A</span>
            </div>
            <div className="w-10 h-10 bg-[#2D7A32] rounded-full flex items-center justify-center text-white font-bold">AF</div>
          </div>
        </header>

        {/* BANNER PENGINGAT [cite: 386] */}
        <div className="bg-white border-l-4 border-[#2D7A32] rounded-xl p-5 shadow-sm mb-8 flex items-center gap-5">
          <div className="bg-green-50 p-3 rounded-full text-[#2D7A32]">
            <Bell size={24} />
          </div>
          <div>
            <h4 className="font-bold text-[#2D7A32] text-sm">Pengingat Batas Waktu</h4>
            <p className="text-gray-500 text-xs">
              Input nilai UTS semester ganjil akan ditutup pada tanggal <b>25 Desember 2025</b>. Mohon segera diselesaikan.
            </p>
          </div>
        </div>

        {/* STATS CARDS [cite: 497] */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <StatCard value="28" label="Total Siswa Kelas 5A" icon={<Users className="text-green-600" />} />
          <StatCard value="2" label="Izin/Sakit Hari Ini" icon={<Calendar className="text-orange-600" />} />
          <StatCard value="85%" label="Kelengkapan Nilai UTS" icon={<ClipboardList className="text-blue-600" />} />
          <StatCard value="5" label="Pesan Belum Dibaca" icon={<Mail className="text-purple-600" />} />
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* TABEL JADWAL [cite: 498] */}
          <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-800">Jadwal Mengajar Hari Ini</h3>
              <button className="text-[#2D7A32] text-xs font-bold hover:underline">Lihat Semua</button>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-[10px] uppercase tracking-wider border-b border-gray-50">
                  <th className="pb-4 font-semibold">Waktu</th>
                  <th className="pb-4 font-semibold">Mata Pelajaran</th>
                  <th className="pb-4 font-semibold">Kelas</th>
                  <th className="pb-4 font-semibold">Ruangan</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <ScheduleRow time="07:30 - 09:00" subject="Matematika" kelas="Kelas 5A" room="R. 301" />
                <ScheduleRow time="09:30 - 11:00" subject="IPA Terpadu" kelas="Kelas 5B" room="Lab IPA" />
                <ScheduleRow time="13:00 - 14:30" subject="Bahasa Indonesia" kelas="Kelas 4A" room="R. 205" />
              </tbody>
            </table>
          </div>

          {/* AKTIVITAS TERBARU [cite: 403, 508] */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
            <h3 className="font-bold text-gray-800 mb-6">Aktivitas Terbaru</h3>
            <div className="space-y-6">
              <ActivityItem time="10m" title="Nilai Tugas Masuk" desc="Andi (Kelas 5A) mengumpulkan tugas Matematika." />
              <ActivityItem time="1j" title="Pengumuman Sekolah" desc="Rapat guru akan diadakan besok jam 14.00." />
              <ActivityItem time="3j" title="Absensi Berhasil" desc="Anda telah menyimpan absensi Kelas 5A." />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Komponen Kecil untuk Reusability
function NavItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <li className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-[#2D7A32] hover:bg-green-50 rounded-xl cursor-pointer transition-all group">
      <span className="group-hover:scale-110 transition-transform">{icon}</span>
      <span className="font-medium text-sm">{label}</span>
    </li>
  );
}

function StatCard({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex justify-between items-start">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-1">{value}</h2>
        <p className="text-gray-400 text-xs font-medium">{label}</p>
      </div>
      <div className="p-3 bg-gray-50 rounded-xl">{icon}</div>
    </div>
  );
}

function ScheduleRow({ time, subject, kelas, room }: { time: string; subject: string; kelas: string; room: string }) {
  return (
    <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
      <td className="py-4 text-gray-500 font-medium text-xs">{time}</td>
      <td className="py-4 font-bold text-gray-800">{subject}</td>
      <td className="py-4">
        <span className="bg-green-50 text-[#2D7A32] px-3 py-1 rounded-lg font-bold text-[10px]">{kelas}</span>
      </td>
      <td className="py-4 text-gray-500 text-xs font-medium">{room}</td>
    </tr>
  );
}

function ActivityItem({ time, title, desc }: { time: string; title: string; desc: string }) {
  return (
    <div className="flex gap-4">
      <span className="text-[10px] font-bold text-gray-300 w-8">{time}</span>
      <div className="relative pl-4 border-l-2 border-gray-100 pb-2">
        <div className="absolute -left-1.25 top-1 w-2 h-2 bg-green-500 rounded-full" />
        <h5 className="text-sm font-bold text-gray-800 leading-none mb-1">{title}</h5>
        <p className="text-[11px] text-gray-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
