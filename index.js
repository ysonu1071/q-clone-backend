const express = require("express")
const cors = require("cors")
const controller = require("./controller/controller")
const userRoute = require("./routes/userRoute")

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

userRoute(app);

app.listen(PORT, ()=>{console.log(`listning at port ${PORT}`)})