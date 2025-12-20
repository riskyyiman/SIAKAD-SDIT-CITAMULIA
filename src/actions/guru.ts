'use server';

import { prisma } from '@/lib/prisma';

export async function getGuru() {
  try {
    const data = await prisma.guru.findMany({
      orderBy: {
        nama: 'asc',
      },
    });
    return data;
  } catch (error) {
    console.error('Gagal mengambil data guru:', error);
    return [];
  }
}

export async function getGuruCount() {
  try {
    const count = await prisma.guru.count();
    return count;
  } catch (error) {
    console.error('Gagal menghitung data guru:', error);
    return 0;
  }
}
