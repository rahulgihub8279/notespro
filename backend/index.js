const connectToMongo = require("./db");
const express = require("express");
connectToMongo();
const cors = require("cors");
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());

//TODO available routes

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`listening on port http://locaalhost:${port}`);
});
