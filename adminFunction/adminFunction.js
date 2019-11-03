
const fs = require('fs')

const readToSourceFile = () => {
  const usersFromFile = fs.readFileSync('./adminFunction/sources.json')
  return JSON.parse(usersFromFile)
}

// Saving an array of students to a JSON file
const writeToSourceFile = (file) => {
  fs.writeFileSync('./public/sources.json', JSON.stringify(file))
}


const createObj = (email, url) => {
  try{
    const usersFromFile = fs.readFileSync("./public/sources.json")
    
    let fileRn = JSON.parse(usersFromFile)
    console.log(fileRn);
    if (fileRn == "{}") {
      console.log("line 21")
      let obj1 = { email: email, url: [url] }
      fs.writeFileSync('./public/sources.json', JSON.stringify(obj1))
    }
    else {
      let flag = false;
      fileRn.forEach(function (obj) {
        console.log(email)
        console.log(obj)
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
    console.log("fuck off")
  }
  
}



// // Getting all students from the JSON file
// const getAllSources = () => {
//   try {
//     const usersFromFile = fs.readFileSync('/adminFunction/sources.json')
//     return JSON.parse(usersFromFile)
//   } catch (e) {
//     return []
//   }
// }

module.exports = {
  createObj
}