const mongoose = require("mongoose");

const setsSchema = new mongoose.Schema({
  setid: {
    type: Number,
    required: [true, "a set must have a id"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "a set must have a name"],
    trim: true,
  },
  priceUvp: {
    type: Number,
  },
  priceBest: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  priority: {
    type: String,
    enum: {
      values: [
        "must have",
        "nice to have",
        "only on discount",
        "maybe",
        "low",
        "owned",
        "dropped",
      ],
      message: "Difficulty is either: easy, medium, difficult",
    },
  },
});

setsSchema.virtual("price30").get(function () {
  return this.priceUvp / 0.7;
});

setsSchema.virtual("price40").get(function () {
  return this.priceUvp / 0.6;
});

const Sets = mongoose.model("Sets", setsSchema);

module.exports = Sets;
