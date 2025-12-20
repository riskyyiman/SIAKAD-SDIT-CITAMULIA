// src/actions/siswa.ts
'use server';

import { prisma } from '@/lib/prisma';

export async function getSiswa() {
  try {
    const data = await prisma.siswa.findMany({
      include: {
        kelas: true, // Mengambil relasi kelas untuk menampilkan nama_kelas
      },
      orderBy: {
        nama: 'asc',
      },
    });
    return data;
  } catch (error) {
    console.error('Gagal mengambil data siswa:', error);
    return [];
  }
}

export async function getSiswaCount() {
  try {
    const count = await prisma.siswa.count();
    return count;
  } catch (erorr) {
    console.error('Gagal menghitung data siswa:', erorr);
    return 0;
  }
}
