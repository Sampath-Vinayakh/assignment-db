const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongo db connected!");
    } catch(err){
        console.error("Connection to db failed!",err.message);
        process.exit(1);
    }
}

module.exports = connectDB;
