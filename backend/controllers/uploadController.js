const multer = require("multer");
const mongoose = require("mongoose");
const PdfDetails = require("../models/pdfDetails");



const PdfSchema = mongoose.model("PdfDetails");

const uploadResume = async (req, res) => {
  const title = req.body.title;
  const fileName = req.file.filename
  try {
    await PdfSchema.create({ title: title, pdf: fileName });
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
};

const getFiles = async (req, res) => {
  try {
    PdfSchema.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    res.json({ status: error });
  }
};

const getFileById = async (req, res) => {
  const file = await PdfDetails.findOne({ _id: req.params.id });
  if (!file) {
    res.status(404).json({ message: "File not found" });
  } else {
    res.status(200).json(file);
  }
};

module.exports = {
  uploadResume,
  getFiles,
  getFileById,
};