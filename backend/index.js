const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const port = process.env.PORT || 2020;

const userRoute = require("./routes/userRoutes")
const shopRouter = require("./routes/shopRouter")
const categoryRouter = require("./routes/categoryRouter")
const productRouter = require("./routes/productRoter")
const historyRouter = require("./routes/historyRouter")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const connectDB = async () => {
    const mongoURL = process.env.database_url;
    try {
        await mongoose.connect(mongoURL);
        console.log('Database is connected');
    } catch (error) {
        console.log(error);
    }
};

app.get('/user', async (req, res) => {
    return res.json({
        "hi": "how are you?"
    })
})
//user router
app.use("/api/user", userRoute)
//shop router
app.use("/api/shop", shopRouter)
//category router
app.use("/api/category", categoryRouter)
//product router
app.use("/api/product", productRouter)
//history router
app.use("/api/history", historyRouter)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    connectDB();
  });
  