const experss = require("express");
const path = require("path");
const formidable = require("formidable");
const uploadFile = require("./Images/GoogleApi");

const app = experss();

const publicFolder = path.join(__dirname, "./public");
app.use(experss.static(publicFolder));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/upload", async (req, res, next) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json(err);
    }
    if (!files.image.name.match(/\.(jpg|png|jpeg)$/)) {
      return res.status(400).json({ error: "only accept jpg png jpeg" });
    }
    const uploadData = await uploadFile(files.image.path, files.image.type);
    console.log("object==??", uploadData);
    res.json({ fields, files, uploadData });
  });
});

app.listen(5000, () => {
  console.log("server is listening at port 5000");
});
