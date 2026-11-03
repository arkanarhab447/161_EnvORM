require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.post("/komik", async (req, res) => {
  const data = { ...req.body };
  delete data.id;
  try {
    const komik = await db.Komik.create(data);
    res.status(201).json(komik.toJSON());
  } catch(err) {
    res.status(500).json({ message: 'Gagal menambahkan komik', error: err.message });
  }
})

app.get("/komik", async (req, res) => {
  try {
    const komik = await db.Komik.findAll();
    res.send(komik);
  } catch(err) {
    res.send(err)
  }
})






