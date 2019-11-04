// Admin Functions 


const fs = require('fs')

// Creating the Object so that user can see which 
// user made the request to add a specific URL
const createObj = (email, url) => {
  try{
    const usersFromFile = fs.readFileSync("./public/sources.json")
    
    let fileRn = JSON.parse(usersFromFile)
    if (fileRn == "{}") {
      let obj1 = { email: email, url: [url] }
      fs.writeFileSync('./public/sources.json', JSON.stringify(obj1))
    }
    else {
      let flag = false;
      fileRn.forEach(function (obj) {

        if (obj.email == email) {
          obj.url.push(url)
          flag = true;
        }
      })
      if (!flag) {
        fileRn.push({ email: email, url: [url] })
      }
    }
    fs.writeFileSync('./public/sources.json', JSON.stringify(fileRn))
  }

  catch(e){
    console.log("Not good")
  }
  
}

module.exports = {
  createObj
}