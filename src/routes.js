const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");

const File = require("./models/File");

routes.get("/files", async (req, res) => {
  const files = await File.find();

  return res.json(files);
});

routes.post("/files", multer(multerConfig).single("file"), async (req, res) => {
  const { originalname: name, size, key, location: url = "" } = req.file;

  const file = await File.create({
    name,
    size,
    key,
    url
  });

  return res.json(file);
});

routes.delete("/files/:id", async (req, res) => {
  const file = await File.findById(req.params.id);

  await file.remove();

  return res.send();
});

module.exports = routes;