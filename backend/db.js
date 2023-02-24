const mongoose = require('mongoose')
const mongoURI = "mongodb+srv://ankitshr:blackeyed@cluster0.3ezjlf2.mongodb.net/inotes"

mongoose.set("strictQuery", false);
const connectToMongo = () =>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully")
    })
}

module.exports = connectToMongo;
