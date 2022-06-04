// Core Module
// File System

const fs = require('fs')

// Menuliskan ke file secara Synchronous
// try {
//   fs.writeFileSync('data/test.txt', 'Hello World secara synchronous')
// } catch (error) {
//   console.log(error)
// }

// Menuliskan ke file secara Asynchronous
// fs.writeFile('data/test.txt', 'Hello World secara asynchronous', (err) => {
//   console.log(err)
// })

// Membaca isi file synchronous
// const data = fs.readFileSync('data/test.txt', 'utf-8')
// //console.log(data.toString())
// console.log(data)

// Membaca isi file asynchronous
// fs.readFile('data/test.txt', 'utf8', (err, data) => {
//   if (err) throw err
//   console.log(data)
// })

// Readline
const readline = require('readline')
const { stdin: input, stdout: output, stderr } = require('process')
const rl = readline.createInterface({ input, output })
const { exec } = require('child_process')

// rl.question('Masukan nama anda: ', (nama) => {
//   rl.question('Masukan nomor HP anda: ', (noHP) => {
//     console.log(`Terima kasih ${nama}, telah mengisikan nomor HP ${noHP}`)

//     rl.close()
//   })
// })

function tampilData(tampil_data) {
  switch (tampil_data) {
    case 'y':
    case 'Y':
      console.log('\
        \n====================\
        \n| Menampilkan Data |\
        \n====================\
      ')
      exec("cat data/contacts.json | jq '.' -C", (err, stdout) => {
        if (err) throw err
        console.log(stdout)
      })
      break;

    default:
      break;
  }
}

rl.question('Masukan nama anda: ', (nama) => {
  rl.question('Masukan nomor HP anda: ', (noHP) => {
    const contact = { nama, noHP }
    const file = fs.readFileSync('data/contacts.json', 'utf8')
    // karena isi dari variable `file` ada string, kita harus mengubah nya terlebih
    // dahulu ke dalam bentuk format JSON menggunakan method JSON.parse()
    const contacts = JSON.parse(file)

    contacts.push(contact)
    // kebalikan dari sebelumnya, untuk menuliskan atau write text ke dalam file
    // harus dalam bentuk string, instance buffer, array, dataview. Karena sekarang
    // isi dari variable `contacts` sudah dalam bentuk JSON kita ubah lagi kedalam bentuk
    // format string menggunakan method JSON.stringify()
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))

    rl.question('Ingin menampilkan data? [y/n] ', (tampil_data) => {
      tampilData(tampil_data)
      rl.close()
    })
  })
})