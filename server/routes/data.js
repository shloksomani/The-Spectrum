const mongoose = require("mongoose");
let three_day_data = {
};
// Fetching articles from DB from past 3 days
for (collection in mongoose.connection.collections){
    mongoose.connection.news_articles.collection(collection, function(err, collection) {
    collection.find({ published: { $gt: new Date(new Date() - 24 * 3 * 60 * 60 * 1000)}})
    .toArray()
    .then(
        documents => {
          // get docs from past 3 days
          three_day_data.collection = documents;
          console.log(documents);
        },
        error => {
          log("Can't fetch articles for left bias", error);
        }
      );
    });
}

    // const db = client.db("news_articles");

    /// A 'select all' query to get all the documents
    // toArray(): promise based function that gives the documents
    // db.collection("left")
    //   .find({
    //     published: { $gt: new Date(new Date() - 24 * 3 * 60 * 60 * 1000) }
    //   })
    //   .toArray()
    //   .then(
    //     documents => {
    //       // get docs from past 3 days
    //       three_day_data.left_bias = documents;
    //       console.log(documents);
    //     },
    //     error => {
    //       log("Can't fetch articles for left bias", error);
    //     }
    //   );
  

module.exports = {three_day_data};
