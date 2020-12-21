const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

const app = express();
const upload = multer();

app.use(express.json());
app.use(cors());

/* Just FYI. For using in production, you are better off using node.js behind nginx, and make nginx handle static content.
Apparently, it is much better suited for handling that. */

app.get("/", (req, res) => {
  res.send("hi");
});

app.post("/upload", upload.single("file"), async (req, res) => {
  const {
    file,
    body: { name },
  } = req;

  if (file.detectedFileExtension != ".pdf")
    return res.status(422).send("InvalidFile");

  const fileName =
    name + Math.floor(Math.random() * 1000) + file.detectedFileExtension;

  await pipeline(
    file.stream,
    fs.createWriteStream(`${__dirname}/uploads/${fileName}`)
  );

  res.send("BIRULEIBE");
});

app.get("/download/:filename", (req, res) => {
  const { filename } = req.params;
  const file = `${__dirname}/uploads/${filename}.pdf`;
  if (fs.existsSync(file)) return res.download(file);
  res.status(404).send("File not found");
});

app.listen(3001, () => console.log("App listening on port 3001"));
