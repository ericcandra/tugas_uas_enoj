const axios = require("axios");

const index = async (req, res) => {
    try {
        // mendapatkan data buku dari API eksternal
        const response = await axios.get(
            "https://tugas-pa-wahir-uas-enoj.vercel.app/api/buku"
            // cloud mongodb
        );

        const buku = response.data;

        res.render("buku", {
            title: "Halaman Buku",
            buku,
            layout: "main",
        });
    }catch (error)  {
        console.error(error.mesage);
        res.status(500).send("Gagal mendapatkan data buku dari api");
    }
};

const store = async (req, res) => {
    const { nama, penulis, tahun, jenis } = req.body;
    try {
      const response = await fetch(
            "https://tugas-pa-wahir-uas-enoj.vercel.app/api/buku",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nama, penulis, tahun, jenis }),
        }
      );
  
      if (response.ok) {
        res.redirect("/buku"); // Redirect ke halaman buku setelah berhasil menambah
      } else {
        res.status(500).send("Gagal menambahkan data buku.");
      }
    } catch (error) {
      res.status(500).send("Error menambahkan data buku");
    }
  };

  const update = async (req, res) => {
    const { id } = req.params; // ID buku yang diterima dari URL
    const { nama, penulis, tahun, jenis } = req.body;

    console.log("Data untuk update:", { id, nama, penulis, tahun, jenis });

    try {
        const response = await axios.put(`https://tugas-pa-wahir-uas-enoj.vercel.app/api/buku/${id}`, {
            nama,
            penulis,
            tahun,
            jenis,
        });

        if (response.status === 200) {
            res.redirect("/buku");
        } else {
            res.status(500).send("Gagal memperbarui data buku.");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error memperbarui data buku");
    }
};

const deleteBuku = async (req, res) => {
    const { id } = req.params; // Mendapatkan ID dari parameter URL
    try {
        const response = await axios.delete(
            `https://tugas-pa-wahir-uas-enoj.vercel.app/api/buku/${id}`
        );

        if (response.status === 200) {
            res.redirect("/buku"); // Redirect ke halaman utama setelah berhasil menghapus
        } else {
            res.status(500).send("Gagal menghapus buku.");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error menghapus buku.");
    }
};


module.exports = { index, store, update, deleteBuku};
