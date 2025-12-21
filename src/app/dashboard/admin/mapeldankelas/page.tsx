import { PrismaClient } from '@prisma/client';
import { Plus, User, BookOpen } from 'lucide-react';

const prisma = new PrismaClient();

export default async function MapelKelasPage() {
  // Fetch data Mapel, beserta nama Guru pengampu, dan daftar Kelas tempat mapel itu diajarkan
  const dataMapel = await prisma.mapel.findMany({
    include: {
      guru: true, // Ambil detail guru (nama, gelar)
      mapel_kelas: {
        include: {
          kelas: true, // Ambil nama kelas (5A, 5B) dari tabel join
        },
      },
    },
  });

  return (
    <div className="p-8 min-h-screen bg-[#FFF5F5]">
      {' '}
      {/* Background Pink Tipis */}
      {/* Header Section */}
      <div className="flex flex-col md:flex-row  justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mapel & Kelas</h1>
          <p className="text-gray-500 text-sm">Pengaturan Akademik</p>
        </div>

        {/* Tombol Tambah Mapel (Hijau) */}
        <button className="bg-[#2D8A39] hover:bg-[#236b2d] text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 font-medium">
          <Plus size={18} />
          <span>Tambah Mapel</span>
        </button>
      </div>
      {/* Filter Semester Badge */}
      <div className="mb-8">
        <span className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-semibold shadow-sm inline-block">Semester Ganjil 2025/2026</span>
      </div>
      {/* Grid Cards Mapel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataMapel.map((item) => (
          <div key={item.kode_mapel} className="bg-white rounded-xl p-6 shadow-sm border-l-[6px] border-[#2D8A39] flex flex-col justify-between h-full hover:shadow-md transition-shadow">
            <div>
              {/* Nama Mapel */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.nama_mapel}</h3>

              {/* Nama Guru dengan Icon */}
              <div className="flex items-center gap-2 text-gray-500 mb-4">
                <User size={16} />
                <span className="text-sm font-medium">{item.guru?.nama || 'Guru belum ditentukan'}</span>
              </div>
            </div>

            {/* Daftar Kelas (Chips Hijau) */}
            <div className="flex flex-wrap gap-2 mt-2">
              {item.mapel_kelas.length > 0 ? (
                item.mapel_kelas.map((mk) => (
                  <span key={mk.id_mapel_kelas} className="bg-[#E8F5E9] text-[#1B5E20] text-[11px] font-bold px-3 py-1 rounded-md">
                    Kelas {mk.kelas.nama_kelas}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-400 italic">Belum ada kelas</span>
              )}
            </div>
          </div>
        ))}

        {/* State Kosong (Jika Database Kosong) */}
        {dataMapel.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-400">
            <BookOpen size={48} className="mb-4 opacity-50" />
            <p>Belum ada data mapel. Silakan jalankan seed atau tambah manual.</p>
          </div>
        )}
      </div>
    </div>
  );
}
