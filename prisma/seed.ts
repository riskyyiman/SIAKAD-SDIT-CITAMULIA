import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Membuat hash asli untuk 'admin123'
  const passwordHash = bcrypt.hashSync('admin123', 10);

  console.log('🧹 Pembersihan dan Seeding ulang...');
  await prisma.mapelKelas.deleteMany({});
  await prisma.mapel.deleteMany({});
  await prisma.kelas.deleteMany({});
  await prisma.guru.deleteMany({});
  await prisma.users.deleteMany({});

  // 1. ADMIN (TU)
  await prisma.users.createMany({
    data: [
      { username: 'admin_utama', nama: 'Muhammad Ahsan Al Wahhab', password: passwordHash, role: 'Admin' },
      { username: 'staff_tu01', nama: 'Risky Iman Lal Prasetio', password: passwordHash, role: 'Admin' },
    ],
  });

  // 2. GURU
  const userGuru = await prisma.users.create({
    data: { username: 'guru_bambang', nama: 'Bambang Setyadi, S.Pd', password: passwordHash, role: 'Guru' },
  });
  await prisma.guru.create({
    data: { nip: '199001', id_user: userGuru.id_user, nama: 'Bambang Setyadi, S.Pd', no_hp: '0812', spesialisasi: 'Matematika' },
  });

  console.log('✅ SEEDING BERHASIL! Gunakan password: admin123');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
