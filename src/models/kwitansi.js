const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Kwitansi = new Schema({
    nomor_kwitansi: {
        type: String,
        require: true
    },
    perihal: {
        type: String,
        require: true
    },
    lokasi: {
        type: String,
        require: true
    },
    alamat: {
        type: String,
        require: true
    },
    kode_rekening: {
        type: String,
        require: true
    },
    tanggal_berangkat: {
        type: Date,
        require: true
    },
    tanggal_kembali: {
        type: Date,
        require: true
    },
    pegawai_yang_diperintahkan: {
        type: Object,
        require: true
    },
    lama_perjalanan: {
        type: String,
        require: true
    },
    uang_harian: {
        type: Object,
        require: true
    },
    uang_transport: {
        type: Object,
        require: true
    },
    uang_penginapan: {
        type: Object,
        require: true
    },
    jumlah_penerimaan: {
        type: Object,
        require: true
    },
    kpa: {
        type: Object,
        require: true
    },
    pptk: {
        type: Object,
        require: true
    },
    bendahara: {
        type: Object,
        require: true
    },
    bendahara_pembantu: {
        type: Object,
        require: true
    },
    tanggal_kwitansi: {
        type: Date,
        require: true
    },
    tahun: {
        type: Number,
        require: true
    },
    operator: {
        type: Object,
        require: true
    },
    file: {
        type: String,
        require: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Kwitansi', Kwitansi)