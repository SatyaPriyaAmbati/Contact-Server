const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
connectDb();
const userRoutes=require("./routes/userRoutes");
const app = express();
const port = 5000;
app.use(errorHandler);
app.use(express.json());


app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/users",require("./routes/userRoutes"));
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
