const express = require("express");
const app = express();

// config mongoose
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/rabbit_db");
  console.log(`[DATABASE] MongoDb is connected`);
}

const port = process.env.PORT || 4567;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bonjour");
});

app.use("/rabbits", require("./routes/rabbitRoutes"));
app.use("/users", require("./routes/userRoutes"));

app.listen(port, () => console.log(`Application is running on port : ${port}`));
