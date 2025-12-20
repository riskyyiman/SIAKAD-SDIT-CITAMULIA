'use client';

import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { getGuru } from '@/actions/guru';
import { getGuruCount } from '@/actions/guru';

export default function KelolaGuruPage() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    getGuru().then(setTeachers);
  }, []);

  // Filter berdasarkan pencarian
  const filteredTeachers = teachers.filter((g) => g.nama.toLowerCase().includes(searchTerm.toLowerCase()) || g.nip.includes(searchTerm));

  // Logika pembatasan: Tampilkan semua jika showAll true, jika tidak tampilkan 5 saja
  const displayedTeachers = showAll ? filteredTeachers : filteredTeachers.slice(0, 6);

  return (
    <div className="p-8 bg-[#FFF5F5] min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kelola Data Guru</h1>
          <p className="text-gray-400 text-sm font-medium">Data Tenaga Pengajar SDIT Cita Mulia</p>
        </div>
        <div className="w-10 h-10 bg-[#2D7A32] rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg">TU</div>
      </div>

      {/* TOOLBAR */}
      <div className="flex justify-between items-center mb-8 gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
          <input
            type="text"
            placeholder="Cari nama atau NIP..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#2D7A32] transition-all text-sm shadow-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="bg-[#2D7A32] text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-[#25632a] transition-all shadow-lg shadow-green-100">
          <Plus size={18} /> Tambah Guru
        </button>
      </div>

      {/* GRID KARTU GURU */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedTeachers.map((guru) => (
          <div key={guru.nip} className="bg-white rounded-4xl p-8 shadow-sm border border-gray-50 flex flex-col items-center text-center group hover:shadow-md transition-all">
            {/* Inisial Bulat */}
            <div className="w-24 h-24 bg-[#E8F1FF] text-[#2D7A32] rounded-full flex items-center justify-center font-black text-2xl mb-6 group-hover:bg-[#2D7A32] group-hover:text-white transition-all duration-300">
              {guru.nama
                .split(' ')
                .map((n: string) => n[0])
                .join('')
                .substring(0, 2)
                .toUpperCase()}
            </div>

            {/* Informasi Guru */}
            <h3 className="text-lg font-bold text-gray-800 mb-1">{guru.nama}</h3>
            <p className="text-gray-400 text-xs font-bold mb-4 bg-gray-50 px-3 py-1 rounded-full uppercase tracking-wider">NIP: {guru.nip}</p>
            <p className="text-[#2D7A32] font-bold text-sm mb-8">{guru.spesialisasi || 'Tenaga Pengajar'}</p>

            {/* Tombol Aksi */}
            <div className="flex gap-3 w-full">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#FFF9E5] text-[#FFB800] rounded-xl font-bold text-xs hover:bg-[#FFB800] hover:text-white transition-all">
                <Edit size={14} /> Edit
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#FFF0F0] text-[#FF4D4D] rounded-xl font-bold text-xs hover:bg-[#FF4D4D] hover:text-white transition-all">
                <Trash2 size={14} /> Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* TOMBOL TAMPILKAN SEMUA  */}
      {filteredTeachers.length > 5 && (
        <div className="mt-12 flex justify-center">
          <button onClick={() => setShowAll(!showAll)} className="flex items-center gap-2 text-[#2D7A32] font-bold text-sm hover:underline transition-all">
            {showAll ? (
              <>
                {' '}
                <ChevronUp size={20} /> Tampilkan Lebih Sedikit{' '}
              </>
            ) : (
              <>
                {' '}
                <ChevronDown size={20} /> Tampilkan Semua ({filteredTeachers.length} Guru){' '}
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
