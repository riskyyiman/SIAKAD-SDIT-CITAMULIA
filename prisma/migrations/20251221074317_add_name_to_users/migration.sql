-- CreateTable
CREATE TABLE `Users` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `role` ENUM('Admin', 'Guru', 'Wali') NOT NULL,

    UNIQUE INDEX `Users_username_key`(`username`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Guru` (
    `nip` VARCHAR(20) NOT NULL,
    `id_user` INTEGER NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `no_hp` VARCHAR(15) NOT NULL,
    `spesialisasi` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `Guru_id_user_key`(`id_user`),
    PRIMARY KEY (`nip`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kelas` (
    `id_kelas` INTEGER NOT NULL AUTO_INCREMENT,
    `wali_kelas_id` VARCHAR(20) NULL,
    `nama_kelas` VARCHAR(10) NOT NULL,
    `tahun_ajaran` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id_kelas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mapel` (
    `kode_mapel` VARCHAR(10) NOT NULL,
    `nama_mapel` VARCHAR(50) NOT NULL,
    `nip_guru` VARCHAR(20) NULL,

    PRIMARY KEY (`kode_mapel`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MapelKelas` (
    `id_mapel_kelas` INTEGER NOT NULL AUTO_INCREMENT,
    `id_kelas` INTEGER NOT NULL,
    `id_mapel` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `MapelKelas_id_kelas_id_mapel_key`(`id_kelas`, `id_mapel`),
    PRIMARY KEY (`id_mapel_kelas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Siswa` (
    `nis` VARCHAR(20) NOT NULL,
    `id_user` INTEGER NULL,
    `id_kelas` INTEGER NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `tgl_lahir` DATE NOT NULL,
    `alamat` TEXT NOT NULL,
    `id_ortu` INTEGER NULL,

    UNIQUE INDEX `Siswa_id_user_key`(`id_user`),
    PRIMARY KEY (`nis`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nilai` (
    `id_nilai` INTEGER NOT NULL AUTO_INCREMENT,
    `id_siswa` VARCHAR(20) NOT NULL,
    `id_mapel` VARCHAR(10) NOT NULL,
    `nilai_tugas` INTEGER NOT NULL,
    `nilai_uts` INTEGER NOT NULL,
    `nilai_uas` INTEGER NOT NULL,
    `grade` CHAR(1) NOT NULL,

    PRIMARY KEY (`id_nilai`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Absensi` (
    `id_absensi` INTEGER NOT NULL AUTO_INCREMENT,
    `id_siswa` VARCHAR(20) NOT NULL,
    `tanggal` DATE NOT NULL,
    `status` ENUM('Hadir', 'Sakit', 'Izin', 'Alpha') NOT NULL,
    `keterangan` TEXT NULL,

    PRIMARY KEY (`id_absensi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Guru` ADD CONSTRAINT `fk_guru_user` FOREIGN KEY (`id_user`) REFERENCES `Users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kelas` ADD CONSTRAINT `fk_kelas_wali_guru` FOREIGN KEY (`wali_kelas_id`) REFERENCES `Guru`(`nip`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mapel` ADD CONSTRAINT `fk_mapel_guru` FOREIGN KEY (`nip_guru`) REFERENCES `Guru`(`nip`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MapelKelas` ADD CONSTRAINT `fk_mk_kelas` FOREIGN KEY (`id_kelas`) REFERENCES `Kelas`(`id_kelas`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MapelKelas` ADD CONSTRAINT `fk_mk_mapel` FOREIGN KEY (`id_mapel`) REFERENCES `Mapel`(`kode_mapel`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Siswa` ADD CONSTRAINT `fk_siswa_user` FOREIGN KEY (`id_user`) REFERENCES `Users`(`id_user`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Siswa` ADD CONSTRAINT `fk_siswa_ortu` FOREIGN KEY (`id_ortu`) REFERENCES `Users`(`id_user`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Siswa` ADD CONSTRAINT `fk_siswa_kelas` FOREIGN KEY (`id_kelas`) REFERENCES `Kelas`(`id_kelas`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nilai` ADD CONSTRAINT `fk_nilai_siswa` FOREIGN KEY (`id_siswa`) REFERENCES `Siswa`(`nis`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nilai` ADD CONSTRAINT `fk_nilai_mapel` FOREIGN KEY (`id_mapel`) REFERENCES `Mapel`(`kode_mapel`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Absensi` ADD CONSTRAINT `fk_absensi_siswa` FOREIGN KEY (`id_siswa`) REFERENCES `Siswa`(`nis`) ON DELETE RESTRICT ON UPDATE CASCADE;
