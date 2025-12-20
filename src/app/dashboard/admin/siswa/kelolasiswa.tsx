'use client';

import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, User } from 'lucide-react';
import { getSiswa } from './actions';

export default function KelolaSiswaPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Mengambil data dari database saat halaman dimuat
  useEffect(() => {
    getSiswa().then(setStudents);
  }, []);

  return (
    <div className="p-8 bg-[#FFF5F5] min-h-screen">
      {/* Header Halaman [cite: 506] */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kelola Data Siswa</h1>
          <p className="text-gray-500 text-sm">Manajemen Data Peserta Didik</p>
        </div>
        <div className="w-10 h-10 bg-[#2D7A32] rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg">TU</div>
      </div>

      {/* Konten Utama: Tabel Siswa */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50">
        <div className="flex justify-between items-center mb-6 gap-4">
          {/* Search Bar sesuai referensi gambar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Cari nama atau NIS siswa..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#2D7A32] transition-all text-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Tombol Tambah Siswa [cite: 114] */}
          <button className="bg-[#2D7A32] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-[#25632a] transition-all shadow-lg shadow-green-100">
            <Plus size={20} /> Tambah Siswa
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-[11px] uppercase tracking-widest border-b border-gray-50">
                <th className="pb-4 px-4 font-bold">Nama Siswa</th>
                <th className="pb-4 px-4 font-bold">NIS</th>
                <th className="pb-4 px-4 font-bold">Kelas</th>
                <th className="pb-4 px-4 font-bold">Status</th>
                <th className="pb-4 px-4 font-bold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {students
                .filter((s) => s.nama.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((siswa) => (
                  <tr key={siswa.nis} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-all">
                    <td className="py-4 px-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center font-bold text-xs">
                        {siswa.nama
                          .split(' ')
                          .map((n: string) => n[0])
                          .join('')
                          .substring(0, 2)
                          .toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{siswa.nama}</p>
                        <p className="text-[10px] text-gray-400">siswa@citamulia.sch.id</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600 font-medium">{siswa.nis}</td>
                    <td className="py-4 px-4 text-gray-600">{siswa.kelas?.nama_kelas || '-'}</td>
                    <td className="py-4 px-4">
                      <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold">Aktif</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center gap-2">
                        <button className="p-2 text-orange-400 hover:bg-orange-50 rounded-lg transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
