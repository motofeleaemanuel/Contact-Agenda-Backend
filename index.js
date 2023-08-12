const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", contactRoutes);

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  try {
    await mongoose.connect(
      "mongodb+srv://emanuelmotofelea:parola123@cluster0.dsvncdi.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
});
