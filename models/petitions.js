const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petitionSchema = new mongoose.Schema({
  title: String,
  creator: String,
  content: String,
  image: String,
  user: { type: Schema.Types.ObjectId, ref: "User" }
});

const Petitions = mongoose.model("Petition", petitionSchema);

module.exports = Petitions;
