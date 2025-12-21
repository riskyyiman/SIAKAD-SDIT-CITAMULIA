import { PrismaClient } from '@prisma/client';
import { Search, Key, Trash2 } from 'lucide-react';

const prisma = new PrismaClient();

export default async function KelolaAkunPage() {
  // Ambil data user terbaru dari database
  const users = await prisma.users.findMany({
    orderBy: { id_user: 'asc' },
  });

  return (
    <div className="p-10 bg-[#FFF5F5] min-h-screen font-sans">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Kelola Akun</h1>
        <p className="text-gray-400 text-sm font-semibold">Data Pengguna Sistem SIAKAD</p>
      </div>

      {/* Search Bar sesuai desain KelolaAkunWeb.png */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input type="text" placeholder="Cari username, nama, atau role pengguna..." className="w-full pl-12 pr-4 py-3.5 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-[#2D7A32] outline-none text-sm font-medium" />
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-400 text-[11px] uppercase tracking-widest font-bold">
            <tr>
              <th className="px-8 py-6">Username</th>
              <th className="px-8 py-6">Nama Lengkap</th>
              <th className="px-8 py-6">Role / Peran</th>
              <th className="px-8 py-6">Status Akun</th>
              <th className="px-8 py-6 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((user) => (
              <tr key={user.id_user} className="hover:bg-gray-50/30 transition-all group">
                {/* Username */}
                <td className="px-8 py-5 font-bold text-gray-800 text-sm">{user.username}</td>

                {/* Nama Lengkap - Mengambil langsung dari user.nama */}
                <td className="px-8 py-5 text-gray-500 text-sm font-medium">{user.nama}</td>

                {/* Role dengan Badge Berwarna */}
                <td className="px-8 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight
                    ${user.role === 'Guru' ? 'bg-blue-50 text-blue-500' : user.role === 'Wali' ? 'bg-orange-50 text-orange-400' : 'bg-purple-50 text-purple-500'}`}
                  >
                    {user.role === 'Wali' ? 'Wali Murid' : user.role}
                  </span>
                </td>

                {/* Status Aktif */}
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                    <span className="text-green-500 text-xs font-bold">Aktif</span>
                  </div>
                </td>

                {/* Tombol Aksi */}
                <td className="px-8 py-5">
                  <div className="flex justify-end gap-3">
                    <button title="Reset Password" className="p-2.5 bg-[#EBF7EE] text-[#2D7A32] rounded-xl hover:bg-[#d4edda] transition-colors shadow-sm">
                      <Key size={16} />
                    </button>
                    <button title="Hapus Akun" className="p-2.5 bg-[#FEECEC] text-red-500 rounded-xl hover:bg-red-100 transition-colors shadow-sm">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State jika data tidak ada */}
        {users.length === 0 && <div className="py-20 text-center text-gray-400 font-medium">Belum ada data akun. Silakan jalankan seeding database.</div>}
      </div>
    </div>
  );
}
