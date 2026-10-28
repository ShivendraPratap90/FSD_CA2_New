const mongoose  = require("mongoose")
async function ConnectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DataBase Connected to Server")
    }
    catch(err){
        console.log("message:",err)
    }
}
module.exports = ConnectDB
