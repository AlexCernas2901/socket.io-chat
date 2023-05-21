const express = require("express");
const router = express.Router();
const fs = require("fs");

const pathRouter = `${__dirname}`;

const removeExtension = (fileName) => fileName.split(".").shift();

// creando rutas apartir de los archivos
fs.readdirSync(pathRouter)
  .filter((file) => !["index"].includes(removeExtension(file)))
  .forEach((file) => {
    const noExtension = removeExtension(file);
    router.use(`/${noExtension}`, require(`./${noExtension}`));
    console.log(`ROUTES -> ${noExtension}`);
});

router.get("*", (req, res) => {
  res.status(404).send({ error: "Not found" });
});

module.exports = router;