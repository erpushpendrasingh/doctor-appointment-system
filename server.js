const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

//dotenv config
dotenv.config();

// mongodb connection
connectDb();

// rest object
const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", require("./routes/userRoutes"));

// listen port
const port = process.env.PORT || 8080;
app.listen(port, () => {
     console.log(
          `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
               .bgCyan.white
     );
});
