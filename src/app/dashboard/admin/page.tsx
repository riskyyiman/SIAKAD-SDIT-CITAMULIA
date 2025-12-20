'use client';

import React, { useEffect, useState } from 'react';
import { getSiswaCount } from '@/actions/siswa';
import { GraduationCap, MonitorPlay, School, Users, Server, Lock, FileText, ChevronDown } from 'lucide-react';
import { getGuruCount } from '@/actions/guru';

export default function AdminDashboard() {
  // 1. Buat state untuk menyimpan jumlah siswa
  const [totalSiswa, setTotalSiswa] = useState<number>(0);
  const [totalGuru, setTotalGuru] = useState<number>(0);

  // 2. Ambil data dari database saat komponen dimuat
  useEffect(() => {
    getSiswaCount().then((count) => setTotalSiswa(count));
  }, []);

  useEffect(() => {
    getGuruCount().then((count) => setTotalGuru(count));
  }, []);

  return (
    <div className="p-8 bg-[#FFF5F5] min-h-screen">
      {/* HEADER */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Tata Usaha</h1>
          <p className="text-gray-400 text-sm">Selamat Datang di Panel Administrator.</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-bold text-gray-800 text-sm">Staff Tata Usaha</p>
            <span className="bg-green-100 text-[#2D7A32] text-[10px] px-2 py-0.5 rounded-full font-bold">Administrator</span>
          </div>
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-[#2D7A32] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">TU</div>
            <ChevronDown size={16} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>
        </div>
      </header>

      {/* SYSTEM STATUS BANNER */}
      <div className="bg-white border-l-[6px] border-red-500 rounded-2xl p-6 shadow-sm mb-8 flex items-center gap-6">
        <div className="bg-red-50 p-3 rounded-2xl text-red-500">
          <Server size={28} />
        </div>
        <div>
          <h4 className="font-bold text-red-600 text-sm flex items-center gap-2">System Status: Normal</h4>
          <p className="text-gray-500 text-xs mt-1">Server berjalan normal. Backup database terjadwal pukul 00:00 WIB. Tidak ada kendala teknis yang dilaporkan.</p>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard value={totalSiswa.toString()} label="Total Siswa Aktif" icon={<GraduationCap size={24} />} iconBg="bg-green-50" iconColor="text-green-600" />
        <StatCard value={totalGuru.toString()} label="Total Guru" icon={<MonitorPlay size={24} />} iconBg="bg-blue-50" iconColor="text-blue-600" />
        <StatCard value="12" label="Total Kelas" icon={<School size={24} />} iconBg="bg-orange-50" iconColor="text-orange-600" />
        <StatCard value="3" label="Admin / Staff" icon={<Users size={24} />} iconBg="bg-purple-50" iconColor="text-purple-600" />
      </div>

      {/* MENU CEPAT */}
      <div className="mb-10">
        <h3 className="font-bold text-gray-800 mb-6 text-lg">Menu Cepat</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MenuCard icon={<Users size={32} />} label="Kelola Data Siswa" />
          <MenuCard icon={<MonitorPlay size={32} />} label="Kelola Data Guru" />
          <MenuCard icon={<Lock size={32} />} label="Reset Password / Akun" />
          <MenuCard icon={<FileText size={32} />} label="Laporan Akademik" />
        </div>
      </div>

      {/* LOG AKTIVITAS SISTEM TERBARU */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-50">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-bold text-gray-800 text-lg">Log Aktivitas Sistem Terbaru</h3>
          <button className="text-[#2D7A32] text-xs font-bold hover:underline transition-all">Lihat Semua</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-[11px] uppercase tracking-widest border-b border-gray-100">
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
    </div>
  );
}

// --- HELPER COMPONENTS ---

interface StatCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

function StatCard({ value, label, icon, iconBg, iconColor }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex justify-between items-start">
      <div>
        <h2 className="text-3xl font-black text-gray-800 mb-1">{value}</h2>
        <p className="text-gray-400 text-xs font-bold">{label}</p>
      </div>
      <div className={`p-3 ${iconBg} ${iconColor} rounded-2xl`}>{icon}</div>
    </div>
  );
}

function MenuCard({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center justify-center text-center hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group h-full">
      <div className="w-16 h-16 bg-green-50 text-[#2D7A32] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#2D7A32] group-hover:text-white transition-all duration-300">{icon}</div>
      <h4 className="font-bold text-gray-800 text-sm px-4">{label}</h4>
    </div>
  );
}

interface LogRowProps {
  time: string;
  user: string;
  role: string;
  activity: string;
  status: string;
}

function LogRow({ time, user, role, activity, status }: LogRowProps) {
  const isSelesai = status === 'Selesai';

  return (
    <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
      <td className="py-5 text-gray-500 text-xs font-medium">{time}</td>
      <td className="py-5">
        <span className="font-bold text-gray-800 text-sm">{user}</span>
        {role && <span className="text-gray-400 font-normal text-[11px] ml-1">{role}</span>}
      </td>
      <td className="py-5 text-gray-600 text-sm font-medium">{activity}</td>
      <td className="py-5 text-right">
        <span className={`${isSelesai ? 'bg-blue-50 text-blue-600' : 'bg-green-100 text-green-700'} px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider`}>{status}</span>
      </td>
    </tr>
  );
}
