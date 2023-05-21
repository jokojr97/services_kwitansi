const express = require('express')

const { body } = require('express-validator')
const router = express.Router();

const kwitansiController = require('../controllers/kwitansi');


// [POST] : /v1/pegawai/insert
router.post('/insert', [
    body('nomor_kwitansi').notEmpty().withMessage("nomor_kwitansi tidak boleh kosong"),
    body('perihal').notEmpty().withMessage("perihal tidak boleh kosong"),
    body('alamat').notEmpty().withMessage("alamat tidak boleh kosong"),
    body('lokasi').notEmpty().withMessage("lokasi tidak boleh kosong"),
    body('kode_rekening').notEmpty().withMessage("kode_rekening tidak boleh kosong"),
    body('tanggal_berangkat').notEmpty().withMessage("tanggal_berangkat tidak boleh kosong"),
    body('tanggal_kembali').notEmpty().withMessage("tanggal_kembali tidak boleh kosong"),
    body('pegawai_yang_diperintahkan').notEmpty().withMessage("pegawai_yang_diperintahkan tidak boleh kosong"),
    body('lama_perjalanan').notEmpty().withMessage("lama_perjalanan tidak boleh kosong"),
    body('uang_harian').notEmpty().withMessage("uang_harian tidak boleh kosong"),
    body('uang_transport').notEmpty().withMessage("uang_transport tidak boleh kosong"),
    body('uang_penginapan').notEmpty().withMessage("uang_penginapan tidak boleh kosong"),
    body('jumlah_penerimaan').notEmpty().withMessage("jumlah_penerimaan tidak boleh kosong"),
    body('kpa').notEmpty().withMessage("kpa tidak boleh kosong"),
    body('pptk').notEmpty().withMessage("pptk tidak boleh kosong"),
    body('bendahara').notEmpty().withMessage("bendahara tidak boleh kosong"),
    body('bendahara_pembantu').notEmpty().withMessage("bendahara_pembantu tidak boleh kosong"),
    body('tanggal_kwitansi').notEmpty().withMessage("tanggal_kwitansi tidak boleh kosong"),
    body('tahun').notEmpty().withMessage("tahun tidak boleh kosong")],
    kwitansiController.insert);


// [PATCH] : /v1/pegawai/edit
router.patch('/update', [
    body('nomor_kwitansi').notEmpty().withMessage("nomor_kwitansi tidak boleh kosong"),
    body('perihal').notEmpty().withMessage("perihal tidak boleh kosong"),
    body('alamat').notEmpty().withMessage("alamat tidak boleh kosong"),
    body('lokasi').notEmpty().withMessage("lokasi tidak boleh kosong"),
    body('kode_rekening').notEmpty().withMessage("kode_rekening tidak boleh kosong"),
    body('tanggal_berangkat').notEmpty().withMessage("tanggal_berangkat tidak boleh kosong"),
    body('tanggal_kembali').notEmpty().withMessage("tanggal_kembali tidak boleh kosong"),
    body('pegawai_yang_diperintahkan').notEmpty().withMessage("pegawai_yang_diperintahkan tidak boleh kosong"),
    body('lama_perjalanan').notEmpty().withMessage("lama_perjalanan tidak boleh kosong"),
    body('uang_harian').notEmpty().withMessage("uang_harian tidak boleh kosong"),
    body('uang_transport').notEmpty().withMessage("uang_transport tidak boleh kosong"),
    body('uang_penginapan').notEmpty().withMessage("uang_penginapan tidak boleh kosong"),
    body('jumlah_penerimaan').notEmpty().withMessage("jumlah_penerimaan tidak boleh kosong"),
    body('kpa').notEmpty().withMessage("kpa tidak boleh kosong"),
    body('pptk').notEmpty().withMessage("pptk tidak boleh kosong"),
    body('bendahara').notEmpty().withMessage("bendahara tidak boleh kosong"),
    body('bendahara_pembantu').notEmpty().withMessage("bendahara_pembantu tidak boleh kosong"),
    body('tanggal_kwitansi').notEmpty().withMessage("tanggal_kwitansi tidak boleh kosong"),
    body('tahun').notEmpty().withMessage("tahun tidak boleh kosong"),],
    kwitansiController.update);

// [GET]: /v1/pegawai/ID
router.get('/:id', kwitansiController.getById)

router.post('/pdf/create', kwitansiController.createPDF)

// [GET]: /v1/pegawai/ID
router.get('/search/:id', kwitansiController.getSearch)

// [DELETE]: /v1/pegawai/ID
router.delete('/:id', kwitansiController.delete)

// [GET]: /v1/pegawai
router.get('/', kwitansiController.getAll)


module.exports = router;