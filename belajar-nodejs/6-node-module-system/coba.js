function cetakNama(nama) {
  return `Halo, nama saya ${nama}`
}

const PI = 3.14

const mahasiswa = {
  nama: 'Vito',
  umur: 20,
  // ES6
  cetakMhs() {
    return `Halo, nama saya ${this.nama}, saya umur ${this.umur} tahun.`
  }
}

class Orang {
  constructor() {
    console.log('Objek orang telah dibuat!')
  }
}

// module.exports.cetakNama = cetakNama
// module.exports.PI = PI
// module.exports.mahasiswa = mahasiswa
// module.exports.Orang = Orang

// ES6
module.exports = { cetakNama, PI, mahasiswa, Orang }