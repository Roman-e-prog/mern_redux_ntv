const mongoose = require("mongoose");
const connectionOptions = {
    dbName: 'Mern_redux',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // other options...
  };
const connectDb = async ()=>{
    try{
        mongoose.set("strictQuery", false);
        const conn = await mongoose.connect(process.env.MONGO_URL, connectionOptions);
        console.log(`MongoDB connected : ${conn.connection.host}`.cyan.underline);
    } catch(error){
        console.log(error);
        process.exit(1);
    }
}
module.exports = connectDb