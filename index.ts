import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import { userRoute } from "./src/routes/userRoute";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

app.use("/api/users", userRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
