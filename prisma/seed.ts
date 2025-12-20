import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Membersihkan data guru dan user lama...');
  // Hapus data guru dulu, baru user (karena relasi FK)
  await prisma.guru.deleteMany({});
  await prisma.users.deleteMany({ where: { role: 'Guru' } });

  const hashedDefaultPassword = await bcrypt.hash('guru123', 10);

  const spesialisasiList = ['Bahasa Indonesia', 'Matematika', 'IPA Terpadu', 'IPS', 'Pendidikan Agama Islam', 'Bahasa Arab', 'Bahasa Inggris', 'PJOK', 'Seni Budaya', 'Informatika'];

  const namaDepan = ['Ahmad', 'Siti', 'Budi', 'Lani', 'Dedi', 'Hana', 'Rizky', 'Dewi', 'Yusuf', 'Eka'];
  const namaBelakang = ['Fauzi', 'Aminah', 'Raharjo', 'Lestari', 'Wijaya', 'Putri', 'Hidayat', 'Saputra', 'Utami', 'Kurniawan'];

  console.log('Memulai proses generate 25 data guru...');

  for (let i = 1; i <= 25; i++) {
    const nip = `199${Math.floor(Math.random() * 10)}${i.toString().padStart(10, '0')}`;
    const nDepan = namaDepan[Math.floor(Math.random() * namaDepan.length)];
    const nBelakang = namaBelakang[Math.floor(Math.random() * namaBelakang.length)];
    const namaLengkap = `${nDepan} ${nBelakang}, S.Pd.`;
    const username = `guru${i.toString().padStart(2, '0')}`;

    // 1. Buat User (Akun Login) [cite: 313, 317]
    const user = await prisma.users.create({
      data: {
        username: username,
        password: hashedDefaultPassword,
        role: 'Guru',
      },
    });

    // 2. Buat Data Guru (Profil) [cite: 320]
    await prisma.guru.create({
      data: {
        nip: nip,
        id_user: user.id_user,
        nama: namaLengkap,
        no_hp: `0812${Math.floor(10000000 + Math.random() * 90000000)}`,
        spesialisasi: spesialisasiList[Math.floor(Math.random() * spesialisasiList.length)],
      },
    });
  }

  console.log('25 Data guru dan akun login berhasil dibuat!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
