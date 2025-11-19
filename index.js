/**
 * Main Application - CLI Interface
 * File ini adalah entry point aplikasi
 *
 * Menu:
 * 1. Tambah Siswa Baru
 * 2. Lihat Semua Siswa
 * 3. Cari Siswa (by ID)
 * 4. Update Data Siswa
 * 5. Hapus Siswa
 * 6. Tambah Nilai Siswa
 * 7. Lihat Top 3 Siswa
 * 8. Keluar
 */

import readlineSync from 'readline-sync';
import Student from './src/Student.js';
import StudentManager from './src/StudentManager.js';

// Inisialisasi StudentManager
const manager = new StudentManager();

/**
 * Menampilkan menu utama
 */
function displayMenu() {
  console.log('\n=================================');
  console.log('SISTEM MANAJEMEN NILAI SISWA');
  console.log('=================================');
  console.log('1. Tambah Siswa Baru');
  console.log('2. Lihat Semua Siswa');
  console.log('3. Cari Siswa');
  console.log('4. Update Data Siswa');
  console.log('5. Hapus Siswa');
  console.log('6. Tambah Nilai Siswa');
  console.log('7. Lihat Top 3 Siswa');
  console.log('8. Keluar');
  console.log('=================================');
}

/**
 * Handler untuk menambah siswa baru
 * - Minta input: ID, Nama, Kelas
 * - Buat object Student baru
 * - Tambahkan ke manager
 * - Tampilkan pesan sukses/gagal
 */
function addNewStudent() {
  console.log('\n--- Tambah Siswa Baru ---');

  const id = readlineSync.question('Masukkan ID siswa: ').trim();
  if (!id) {
    console.log('ID tidak boleh kosong.');
    return;
  }

  // Opsional: cek apakah ID sudah ada
  const existing = manager.findStudent(id);
  if (existing) {
    console.log(`Gagal: Siswa dengan ID "${id}" sudah terdaftar.`);
    return;
  }

  const name = readlineSync.question('Masukkan nama siswa: ').trim();
  if (!name) {
    console.log('Nama tidak boleh kosong.');
    return;
  }

  const studentClass = readlineSync
    .question('Masukkan kelas siswa (misal: 10A, 11B): ')
    .trim();
  if (!studentClass) {
    console.log('Kelas tidak boleh kosong.');
    return;
  }

  const student = new Student(id, name, studentClass);
  const success = manager.addStudent(student);

  if (success) {
    console.log('Siswa berhasil ditambahkan.');
  } else {
    console.log('Gagal menambahkan siswa: ID sudah digunakan.');
  }
}

/**
 * Handler untuk melihat semua siswa
 * - Panggil method displayAllStudents dari manager
 * - Jika tidak ada siswa, tampilkan pesan
 */
function viewAllStudents() {
  console.log('\n--- Daftar Semua Siswa ---');
  const students = manager.getAllStudents();

  if (!students || students.length === 0) {
    console.log('Belum ada data siswa.');
    return;
  }

  manager.displayAllStudents();
}

/**
 * Handler untuk mencari siswa berdasarkan ID
 * - Minta input ID
 * - Cari siswa menggunakan manager
 * - Tampilkan info siswa jika ditemukan
 */
function searchStudent() {
  console.log('\n--- Cari Siswa ---');
  const id = readlineSync.question('Masukkan ID siswa: ').trim();

  if (!id) {
    console.log('ID tidak boleh kosong.');
    return;
  }

  const student = manager.findStudent(id);

  if (!student) {
    console.log(`Siswa dengan ID "${id}" tidak ditemukan.`);
    return;
  }

  console.log('\nData Siswa Ditemukan:');
  student.displayInfo();
}

/**
 * Handler untuk update data siswa
 * - Minta input ID siswa
 * - Tampilkan data saat ini
 * - Minta input data baru (nama, kelas)
 * - Update menggunakan manager
 */
function updateStudent() {
  console.log('\n--- Update Data Siswa ---');
  const id = readlineSync
    .question('Masukkan ID siswa yang akan diupdate: ')
    .trim();

  if (!id) {
    console.log('ID tidak boleh kosong.');
    return;
  }

  const student = manager.findStudent(id);

  if (!student) {
    console.log(`Siswa dengan ID "${id}" tidak ditemukan.`);
    return;
  }

  console.log('\nData saat ini:');
  student.displayInfo();

  console.log('\nMasukkan data baru (kosongkan jika tidak ingin diubah):');
  const newName = readlineSync.question(`Nama baru (${student.name}): `).trim();
  const newClass = readlineSync
    .question(`Kelas baru (${student.class}): `)
    .trim();

  const dataToUpdate = {};
  if (newName) dataToUpdate.name = newName;
  if (newClass) dataToUpdate.class = newClass;

  if (Object.keys(dataToUpdate).length === 0) {
    console.log('Tidak ada perubahan data.');
    return;
  }

  const success = manager.updateStudent(id, dataToUpdate);

  if (success) {
    console.log('Data siswa berhasil diupdate.');
  } else {
    console.log('Gagal mengupdate data siswa.');
  }
}

/**
 * Handler untuk menghapus siswa
 * - Minta input ID siswa
 * - Konfirmasi penghapusan
 * - Hapus menggunakan manager
 */
function deleteStudent() {
  console.log('\n--- Hapus Siswa ---');
  const id = readlineSync
    .question('Masukkan ID siswa yang akan dihapus: ')
    .trim();

  if (!id) {
    console.log('ID tidak boleh kosong.');
    return;
  }

  const student = manager.findStudent(id);

  if (!student) {
    console.log(`Siswa dengan ID "${id}" tidak ditemukan.`);
    return;
  }

  console.log('\nData siswa yang akan dihapus:');
  student.displayInfo();

  const confirm = readlineSync
    .question('Apakah Anda yakin ingin menghapus siswa ini? (y/n): ')
    .trim()
    .toLowerCase();

  if (confirm !== 'y') {
    console.log('Penghapusan dibatalkan.');
    return;
  }

  const success = manager.removeStudent(id);

  if (success) {
    console.log('Siswa berhasil dihapus.');
  } else {
    console.log('Gagal menghapus siswa.');
  }
}

/**
 * Handler untuk menambah nilai siswa
 * - Minta input ID siswa
 * - Tampilkan data siswa
 * - Minta input mata pelajaran dan nilai
 * - Tambahkan nilai menggunakan method addGrade
 */
function addGradeToStudent() {
  console.log('\n--- Tambah Nilai Siswa ---');
  const id = readlineSync.question('Masukkan ID siswa: ').trim();

  if (!id) {
    console.log('ID tidak boleh kosong.');
    return;
  }

  const student = manager.findStudent(id);

  if (!student) {
    console.log(`Siswa dengan ID "${id}" tidak ditemukan.`);
    return;
  }

  console.log('\nData Siswa:');
  student.displayInfo();

  const subject = readlineSync
    .question('Masukkan nama mata pelajaran: ')
    .trim();
  if (!subject) {
    console.log('Nama mata pelajaran tidak boleh kosong.');
    return;
  }

  const scoreInput = readlineSync.question('Masukkan nilai (0-100): ').trim();
  const score = Number(scoreInput);

  if (Number.isNaN(score) || score < 0 || score > 100) {
    console.log('Nilai tidak valid. Nilai harus berupa angka antara 0-100.');
    return;
  }

  try {
    student.addGrade(subject, score);
    console.log(
      `Nilai untuk mata pelajaran "${subject}" berhasil ditambahkan/diupdate.`
    );
  } catch (error) {
    console.log(
      'Terjadi kesalahan saat menambahkan nilai:',
      error.message || error
    );
  }
}

/**
 * Handler untuk melihat top students
 * - Panggil getTopStudents(3) dari manager
 * - Tampilkan informasi siswa
 */
function viewTopStudents() {
  console.log('\n--- Top 3 Siswa ---');
  const topStudents = manager.getTopStudents(3);

  if (!topStudents || topStudents.length === 0) {
    console.log('Belum ada data siswa.');
    return;
  }

  topStudents.forEach((student, index) => {
    console.log(`\nPeringkat ${index + 1}:`);
    student.displayInfo();
  });
}

/**
 * Main program loop
 * - Tampilkan menu
 * - Baca input pilihan
 * - Panggil handler yang sesuai
 * - Ulangi sampai user pilih keluar
 */
function main() {
  console.log('Selamat datang di Sistem Manajemen Nilai Siswa!');

  let running = true;

  while (running) {
    displayMenu();
    const choice = readlineSync.question('Pilih menu (1-8): ').trim();

    switch (choice) {
      case '1':
        addNewStudent();
        break;
      case '2':
        viewAllStudents();
        break;
      case '3':
        searchStudent();
        break;
      case '4':
        updateStudent();
        break;
      case '5':
        deleteStudent();
        break;
      case '6':
        addGradeToStudent();
        break;
      case '7':
        viewTopStudents();
        break;
      case '8':
        running = false;
        break;
      default:
        console.log('Pilihan tidak valid. Silakan pilih angka 1-8.');
    }
  }

  console.log('\nTerima kasih telah menggunakan aplikasi ini!');
}

// Jalankan aplikasi
main();
