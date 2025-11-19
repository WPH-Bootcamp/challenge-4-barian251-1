/**
 * Class Student
 * Representasi dari seorang siswa dengan data dan nilai-nilainya
 *
 * TODO: Implementasikan class Student dengan:
 * - Constructor untuk inisialisasi properti (id, name, class, grades)
 * - Method addGrade(subject, score) untuk menambah nilai mata pelajaran
 * - Method getAverage() untuk menghitung rata-rata nilai
 * - Method getGradeStatus() untuk menentukan status Lulus/Tidak Lulus
 * - Method displayInfo() untuk menampilkan informasi siswa
 *
 * Kriteria Lulus: rata-rata >= 75
 */

class Student {
  // TODO: Implementasikan constructor
  // Properti yang dibutuhkan:
  // - id: ID unik siswa
  // - name: Nama siswa
  // - class: Kelas siswa
  // - grades: Object untuk menyimpan nilai {subject: score}

  constructor(id, name, studentClass) {
    this.id = String(id);
    this.name = name;
    this.class = studentClass;
    this.grades = {}; // format: { subject: score }
  }

  /**
   * Menambah atau update nilai mata pelajaran
   * @param {string} subject - Nama mata pelajaran
   * @param {number} score - Nilai (0-100)
   * TODO: Validasi bahwa score harus antara 0-100
   */
  addGrade(subject, score) {
    const numericScore = Number(score);

    if (!subject || subject.trim() === '') {
      throw new Error('Nama mata pelajaran tidak boleh kosong');
    }

    if (Number.isNaN(numericScore) || numericScore < 0 || numericScore > 100) {
      throw new Error('Nilai harus berupa angka antara 0-100');
    }

    this.grades[subject.trim()] = numericScore;
  }

  /**
   * Menghitung rata-rata nilai dari semua mata pelajaran
   * @returns {number} Rata-rata nilai
   * TODO: Hitung total nilai dibagi jumlah mata pelajaran
   */
  getAverage() {
    const scores = Object.values(this.grades);

    if (scores.length === 0) return 0;

    const total = scores.reduce((sum, s) => sum + s, 0);
    return Number((total / scores.length).toFixed(2));
  }

  /**
   * Menentukan status kelulusan siswa
   * @returns {string} "Lulus" atau "Tidak Lulus"
   * TODO: Return "Lulus" jika rata-rata >= 75, selain itu "Tidak Lulus"
   */
  getGradeStatus() {
    return this.getAverage() >= 75 ? 'Lulus' : 'Tidak Lulus';
  }

  /**
   * Menampilkan informasi lengkap siswa
   * TODO: Tampilkan ID, Nama, Kelas, semua nilai, rata-rata, dan status
   */
  displayInfo() {
    console.log('------------------------');
    console.log(`ID   : ${this.id}`);
    console.log(`Nama : ${this.name}`);
    console.log(`Kelas: ${this.class}`);

    console.log('Mata Pelajaran:');
    if (Object.keys(this.grades).length === 0) {
      console.log('  (Belum ada nilai)');
    } else {
      for (const [subject, score] of Object.entries(this.grades)) {
        console.log(`  - ${subject}: ${score}`);
      }
    }

    console.log(`Rata-rata: ${this.getAverage()}`);
    console.log(`Status   : ${this.getGradeStatus()}`);
  }
}

export default Student;
