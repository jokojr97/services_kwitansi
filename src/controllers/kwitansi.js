const { validationResult } = require('express-validator')
const path = require('path');
const pdf = require('pdf-creator-node')
const fs = require('fs')
const bcrypt = require('bcrypt');

const saltRounds = 10;

const Kwitansi = require('../models/kwitansi');
// const kwitansi = require('../models/kwitansi');

exports.delete = async (req, res, next) => {
    const id = req.params.id || 0;
    if (id == 0) {
        return res.status(400).json({
            message: "invalid value id",
            data: null
        })
        next()
    }

    const data = {
        _id: id
    }

    try {
        const kwitansi = await Kwitansi.findOne(data);
        await kwitansi.remove();
        return res.status(200).json({
            message: "Data dengan id= " + id + " berhasil di hapus",
            data: true
        });
    } catch {
        return res.status(404).json({
            message: "data kwitansi not found",
            eror: "not found"
        });
    }

}
exports.update = async (req, res, next) => {
    const errors = validationResult(req);

    const data = {
        _id: req.body._id
    }

    // cek error validasi
    if (!errors.isEmpty()) {
        const err = new Error("invalid value")
        err.errorStatus = 400;
        err.data = errors.array();
        return res.status(err.errorStatus).json({
            message: "Invalid Value!",
            data: err
        })
    }

    await Kwitansi.findOne(data)
        .then(result => {
            // console.log("id: ", id)
            // console.log("result: ", result)

            if (result) {
                const kwitansi = Object.assign(result, req.body);
                kwitansi.save().then(result => {
                    res.status(200).json({
                        message: "Update Data Success",
                        data: result
                    });
                }).catch(err => {
                    console.log("err: ", err);
                    res.status(400).json({
                        message: "invalid value",
                        eror: err
                    });
                });

            } else {
                return res.status(400).json({
                    message: "data not found",
                    data: null,
                })
            }
        })
        .catch(err => {
            return res.status(404).json({
                message: "data with id = '" + err.value + "' not found",
                eror: err
            });
            next();
        })


}
exports.insert = async (req, res, next) => {
    // inisiasi error validasi
    const errors = validationResult(req);

    const data = {
        nomor_kwitansi: req.body.nomor_kwitansi
    }
    //cek email kwitansi sudah terdaftar
    const carikwitansi = await Kwitansi.findOne(data)
    // console.log(carikwitansi)
    if (carikwitansi != null) {
        return res.status(400).json({
            message: "Nomor kwitansi sudah terdaftar! coba pakai Nomor lain",
            data: carikwitansi
        })
        next()
    }

    // cek error validasi
    if (!errors.isEmpty()) {
        const err = new Error("invalid value")
        err.errorStatus = 400;
        err.data = errors.array();
        return res.status(err.errorStatus).json({
            message: "Invalid Value!",
            data: err
        })
        next()
    }

    // definisi input
    const perihal = req.body.perihal;
    const nomor_kwitansi = req.body.nomor_kwitansi;
    const lokasi = req.body.lokasi;
    const alamat = req.body.alamat;
    const kode_rekening = req.body.kode_rekening;
    const tanggal_berangkat = req.body.tanggal_berangkat;
    const tanggal_kembali = req.body.tanggal_kembali;
    const pegawai_yang_diperintahkan = req.body.pegawai_yang_diperintahkan;
    const lama_perjalanan = req.body.lama_perjalanan;
    const uang_harian = req.body.uang_harian;
    const uang_transport = req.body.uang_transport;
    const uang_penginapan = req.body.uang_penginapan;
    const jumlah_penerimaan = req.body.jumlah_penerimaan;
    const kpa = req.body.kpa;
    const pptk = req.body.pptk;
    const bendahara = req.body.bendahara;
    const bendahara_pembantu = req.body.bendahara_pembantu;
    const tahun = req.body.tahun;
    const tanggal_kwitansi = req.body.tanggal_kwitansi;

    const insertkwitansi = new Kwitansi({
        nomor_kwitansi: nomor_kwitansi,
        perihal: perihal,
        lokasi: lokasi,
        alamat: alamat,
        kode_rekening: kode_rekening,
        tanggal_berangkat: tanggal_berangkat,
        tanggal_kembali: tanggal_kembali,
        pegawai_yang_diperintahkan: pegawai_yang_diperintahkan,
        lama_perjalanan: lama_perjalanan,
        uang_harian: uang_harian,
        uang_transport: uang_transport,
        uang_penginapan: uang_penginapan,
        jumlah_penerimaan: jumlah_penerimaan,
        kpa: kpa,
        pptk: pptk,
        bendahara: bendahara,
        bendahara_pembantu: bendahara_pembantu,
        tahun: tahun,
        tanggal_kwitansi: tanggal_kwitansi,
        operator: {
            id: 1,
            name: "Jo",
            level: "admin"
        },
    });

    insertkwitansi.save()
        .then(result => {
            res.status(201).json({
                message: "Input kwitansi Success",
                data: result
            });
        }).catch(err => {
            console.log("err: ", err);
            res.status(400).json({
                message: "invalid value",
                eror: err
            });
        });
}

exports.getAll = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = req.query.perPage || 5;
    let totalItem;
    const currentPageInt = parseInt(currentPage);
    const perPageInt = parseInt(perPage);

    Kwitansi.find().countDocuments()
        .then(count => {
            totalItem = count;
            return Kwitansi.find().skip((currentPageInt - 1) * perPageInt).limit(perPageInt)
        })
        .then(result => {
            if (totalItem == 0) {
                res.status(400).json({
                    message: "Data masih kosong",
                    data: result,
                })
            } else {
                res.status(200).json({
                    message: "Data berhasil ditampilkan",
                    data: result,
                    total_data: totalItem,
                    current_page: currentPageInt,
                    per_page: perPageInt
                })
            }
        })
        .catch(err => {
            return res.status(400).json({
                message: "invalid value",
                eror: err
            });
            next();
        })
}

exports.getById = async (req, res, next) => {
    const id = req.params.id || 0;
    if (id == 0) {
        return res.status(400).json({
            message: "invalid value id",
            data: null
        })
        next()
    }

    const data = {
        _id: id
    }
    await Kwitansi.findOne(data)
        .then(result => {
            // console.log("id: ", id)
            // console.log("result: ", result)
            if (result) {
                return res.status(200).json({
                    message: "Data berhasil ditampilkan",
                    data: result,
                })
            } else {
                return res.status(400).json({
                    message: "data not found",
                    data: null,
                })
            }
        })
        .catch(err => {
            return res.status(404).json({
                message: "data with id = '" + err.value + "' not found",
                eror: err
            });
            next();
        })

}

exports.getSearch = async (req, res, next) => {
    const id = req.params.id || 0;
    if (id == 0) {
        return res.status(400).json({
            message: "invalid value id",
            data: null
        })
        next()
    }

    const data = {
        _id: id
    }
    await Kwitansi.findOne(data)
        .then(result => {
            // console.log("id: ", id)
            // console.log("result: ", result)
            if (result) {
                return res.status(200).json({
                    message: "Data berhasil ditampilkan",
                    data: result,
                })
            } else {
                return res.status(400).json({
                    message: "data not found",
                    data: null,
                })
            }
        })
        .catch(err => {
            return res.status(404).json({
                message: "data with id = '" + err.value + "' not found",
                eror: err
            });
            next();
        })

}

const setPenerimaPerintah = (data) => {
    data.map((v, i) => {
        return v
    })
}

const settext = (e) => {
    if (e == 1) {
        return "satu"
    } else if (e == 2) {
        return "dua"
    } else if (e == 3) {
        return "tiga"
    } else if (e == 4) {
        return "empat"
    } else if (e == 5) {
        return "lima"
    }
}

exports.createPDF = async (req, res, next) => {

    const html = fs.readFileSync('./index.html', 'utf-8')
    const options = {
        format: "A4",
        orientation: "portrait",
    };

    const pegawai = req.body.pegawai_yang_diperintahkan
    // const settextLamaPerjalanan = settext(req.body.lama_perjalanan)
    // console.log("data", pegawai)
    // console.log("data lenght", pegawai.length)
    var datapegawai = []
    pegawai.map((v, i) => {
        if (i < 1) {
            datapegawai = v
        }
    })
    let tanggalKegiatan = "";
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    if (req.body.tanggal_mulai == req.body.tanggal_selesai) {
        const d = new Date(req.body.tanggal_mulai);
        let tgl = d.getDate();
        let month = months[d.getMonth()];
        tanggalKegiatan = tgl + " " + month
    } else {
        const dMulai = new Date(req.body.tanggal_mulai);
        let tglMulai = d.getDate();
        let monthMulai = months[d.getMonth()];
        const dSelesai = new Date(req.body.tanggal_selesai);
        let tglSelesai = d.getDate();
        let monthSelesai = months[d.getMonth()];
        tanggalKegiatan = tglMuliai + " s/d " + tglSelesai + " " + month
    }

    const datainput = [
        {
            nomor_kwitansi: req.body.nomor_kwitansi,
            pejabat_yang_memerintahkan: {
                name: req.body.pejabat_yang_memerintahkan.name,
                jabatan: req.body.pejabat_yang_memerintahkan.jabatan,
                pangkat: req.body.pejabat_yang_memerintahkan.pangkat,
                nip: req.body.pejabat_yang_memerintahkan.nip,
                golongan: req.body.pejabat_yang_memerintahkan.golongan
            },
            pegawai_yang_diperintahkan: req.body.pegawai_yang_diperintahkan,
            jmlPegawai: pegawai.length,
            tanggalKegiatan: tanggalKegiatan,
            perihal: req.body.perihal,
            dasar_kwitansi: req.body.dasar_kwitansi,
            tanggal_mulai: req.body.tanggal_mulai,
            tanggal_kwitansi: req.body.tanggal_kwitansi,
            lokasi_kegiatan: req.body.lokasi_kegiatan,
            tanggal_selesai: req.body.tanggal_selesai,
            tahun: req.body.tahun,
        }
    ];
    const document = {
        html: html,
        data: {
            data: datainput,
        },
        path: `./pdf/kwitansi_${req.body.nomor_kwitansi}.pdf`,
        type: "",
    };

    pdf.create(document, options)
        .then((result) => {
            console.log(result);
            return res.status(200).json({
                message: "pdf berhasil dibuat",
                data: result,
                pegawai: datapegawai
            });
        })
        .catch((error) => {
            console.error(error);
            return res.status(404).json({
                message: "data with id = '" + error.value + "' not found",
                eror: error
            });
            next();
        });

}