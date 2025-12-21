import React from 'react';
import { FileText, Printer, Calendar, Info, ChevronDown } from 'lucide-react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function CetakLaporanPage() {
  // Mengambil data kelas dari database untuk dropdown secara dinamis
  const classes = await prisma.kelas.findMany({
    orderBy: { nama_kelas: 'asc' },
  });

  return (
    <div className="p-10 bg-[#FFF5F5] min-h-screen font-sans">
      {/* Header Section */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-gray-800">Cetak Laporan</h1>
        <p className="text-gray-400 text-sm font-semibold">Arsip & Laporan Akademik</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Kolom Kiri: Konfigurasi Laporan */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-10 shadow-sm border border-gray-50">
          <h2 className="text-lg font-bold text-gray-800 mb-8 tracking-tight">Konfigurasi Laporan</h2>

          <div className="space-y-6">
            {/* Input: Jenis Laporan */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Jenis Laporan</label>
              <div className="relative group">
                <select className="w-full bg-gray-50 border-none rounded-xl px-5 py-4 text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-[#2D8A39] appearance-none transition-all cursor-pointer">
                  <option>Laporan Absensi Siswa</option>
                  <option>Laporan Nilai Siswa</option>
                  <option>Laporan Data Guru</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-[#2D8A39] transition-colors" size={18} />
              </div>
            </div>

            {/* Input: Pilih Kelas */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Pilih Kelas</label>
              <div className="relative group">
                <select className="w-full bg-gray-50 border-none rounded-xl px-5 py-4 text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-[#2D8A39] appearance-none transition-all cursor-pointer">
                  {classes.map((cls) => (
                    <option key={cls.id_kelas}>{`Kelas ${cls.nama_kelas}`}</option>
                  ))}
                  {classes.length === 0 && <option>Kelas 5A</option>} {/* Fallback jika DB kosong */}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-[#2D8A39] transition-colors" size={18} />
              </div>
            </div>

            {/* Input: Periode / Bulan */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Periode / Bulan</label>
              <div className="relative">
                <input type="text" defaultValue="December 2025" className="w-full bg-gray-50 border-none rounded-xl px-5 py-4 text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-[#2D8A39] transition-all" />
                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            {/* Tombol Generate */}
            <button className="w-full bg-[#2D8A39] hover:bg-[#236b2d] text-white py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-green-100 transition-all font-bold text-sm mt-4">
              <FileText size={18} />
              Generate & Cetak PDF
            </button>

            {/* Alert Info Box */}
            <div className="bg-[#E3F2FD] rounded-xl p-5 flex gap-4 border border-[#BBDEFB]">
              <div className="bg-[#1976D2] p-1 rounded-full h-fit mt-0.5 text-white">
                <Info size={14} />
              </div>
              <p className="text-[11px] font-semibold text-[#1976D2] leading-relaxed">Laporan akan otomatis diunduh dalam format PDF. Pastikan data absen dan nilai sudah divalidasi oleh wali kelas sebelum mencetak.</p>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Pratinjau Cetak */}
        <div className="lg:col-span-7 bg-white/50 border-2 border-dashed border-gray-200 rounded-3xl p-20 flex flex-col items-center justify-center text-center">
          <div className="bg-gray-100 p-6 rounded-2xl text-gray-300 mb-6">
            <Printer size={56} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Pratinjau Cetak</h3>
          <p className="text-gray-400 text-sm max-w-70 leading-relaxed font-medium">Pilih parameter di samping untuk melihat pratinjau dokumen laporan di sini.</p>
        </div>
      </div>
    </div>
  );
}
