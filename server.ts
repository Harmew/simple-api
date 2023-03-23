const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

const { userRoute } = require("./src/routes/userRoute");

const { corsConfig } = require("./src/global/corsConfig");

dotenv.config();

export const app = express();

app.use(bodyParser.json());
app.use(cors(corsConfig));

app.use("/api/", userRoute);
