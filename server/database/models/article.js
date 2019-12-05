const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.promise = Promise;
const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlegth: 1,
    trim: true
  },
  authors: {
    type: Array,
    required: false
  },
  text: {
    type: String,
    required: false
  },
  summary: {
    type: String,
    required: false
  },
  top_image: {
    type: String,
    required: false
  },
  url: {
    type: String,
    trim: true
    // default: 1S
  },
  mbfc: {
    type: String,
    required: true,
    trim: true
    // default: 1
  },
  brand: {
    type: String,
    required: true,
    trim: true
    // default: 1
  },
  published: {
    type: Date,
    required: false
    // default: 1
  },
  keywords: {
    type: Array,
    required: true
    // default: 1
  },
  bias: {
    type: String,
    required: true
  }
});
const Article = mongoose.model("Article", articleSchema);
// const Left = mongoose.model("Left", articleSchema);
// const least_bias = mongoose.model("least_bias", articleSchema);
// const left_center = mongoose.model("left_center", articleSchema);
// const right_center = mongoose.model("right_center", articleSchema);
//const daniel = mongoose.model("daniel", articleSchema);
//const one_collection = mongoose.model("one_collection", articleSchema);
module.exports = {
  Article
  //one_collection
};
