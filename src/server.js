const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 8009;
app.use(cors());
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://eashwarsaiboini:Eash1234@cluster0.iaj4fru.mongodb.net/files_db?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });
const dataSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageobj: Object,
  videoobj: Object,
});

const Entiredata = mongoose.model("Entiredata", dataSchema);
app.post("/upload", async (req, res) => {
  const { title, description, imageobj, videoobj } = req.body;
  console.log("hello");
  try {
    const newdata = new Entiredata({
      title,
      description,
      imageobj: imageobj,
      videoobj: videoobj,
    });
    console.log(newdata)
    const savedDetails = await newdata.save();
    res.status(200).send(savedDetails);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
app.get("/show",  (req, res) => {
  // console.log()
  Entiredata.find().then((r) => {
      res.json(r);
    })
    .catch((error) => {
      console.log("Error fetching colleges:", error);
      res.status(500).json({ error: "Failed to fetch colleges" });
    });
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
