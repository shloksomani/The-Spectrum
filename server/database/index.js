//Connect to Mongo database
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//your local database url
//27017 is the default mongoDB port
const uri = "mongodb+srv://admin:admin@cluster0-dfcfv.mongodb.net/news_articles?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */

    console.log("You are connected to Mangos");
  },
  err => {
    /** handle initial connection error */

    console.log("error connecting to Mangos: ");
    console.log(err);
  }
);

module.exports = mongoose.connection;
