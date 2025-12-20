'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Fungsi untuk mengambil semua data siswa
export async function getSiswa() {
  return await prisma.siswa.findMany({
    include: {
      kelas: true, // Mengambil data nama kelas
    },
    orderBy: { nama: 'asc' },
  });
}

export async function addSiswa(formData: FormData) {
  const nama = formData.get('nama') as string;
  const nis = formData.get('nis') as string;
  const id_kelas = parseInt(formData.get('id_kelas') as string);
  const tgl_lahir = new Date(formData.get('tgl_lahir') as string);
  const alamat = formData.get('alamat') as string;
  const jenis_kelamin = formData.get('jenis_kelamin') as string;

  await prisma.siswa.create({
    data: {
      nama,
      nis,
      id_kelas,
      tgl_lahir,
      alamat,
    },
  });

  revalidatePath('/dashboard/admin/siswa');
}
