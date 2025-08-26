const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const repositiesRouter = require("./routes/repositories");
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");

app.use(cors());
app.use(express.json());

app.use("/api/repository",repositiesRouter);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!'
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

async function start(){
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

start();

