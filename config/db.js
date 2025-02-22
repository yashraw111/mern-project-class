const { default: mongoose } = require("mongoose")

const DB_URL = 'mongodb://localhost:27017/MERN_PROJECT_CLASS'
exports.dbConnect =()=>{

    mongoose.connect(DB_URL)
    .then(()=>{
        console.log("db connected 😎😎")
    })
    .catch((err)=>{
        console.log(err)

    })

}