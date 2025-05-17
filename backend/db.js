const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/notepad_db";
  
const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => console.log("success connect to mongo"))
    .catch((err) => console.error("error ", err));
};

module.exports = connectToMongo;
