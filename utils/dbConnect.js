const mongoose = require("mongoose")
const dbConnect =()=>{
    mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log("Database connected")
})
.catch(err=>{
    console.log(err)
})
}
module.exports = dbConnect