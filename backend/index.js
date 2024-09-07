const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
const mainRouter = require("./routes/index");
const { User } = require("./db");

app.use("/api/v1", mainRouter);
app.listen(3000);
console.log("App listening on port 3000");

User.create({
  userId: "randomId",
});
