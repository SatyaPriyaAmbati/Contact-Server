const mongoose = require("mongoose");


const connectDb = async () => {
    try {
        const uri = "mongodb://localhost:27017/Contact"; // Replace 'your-database-name' with your actual database 
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB connected successfully!");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
};

module.exports = connectDb;
