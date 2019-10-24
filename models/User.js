//const mongoose = require("mongoose");

//const model_name = "users";
const users = []

function createUser(name, email, password) {
  let user = {
    "name":name,
    "email":email,
    "password":password
  };
  users.push(user)
}

// Create schema for users
// const schmea = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     index: true,
//     unique: true
//   },
//   name: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   date_created: {
//     type: Date,
//     default: Date.now()
//   }
// });

// module.exports = mongoose.model(model_name, schmea, model_name);
module.exports = createUser();
