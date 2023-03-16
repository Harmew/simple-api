import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { userRoute } from "./src/routes/userRoute";

import { corsConfig } from "./src/global/corsConfig";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors(corsConfig));
app.use(helmet());
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/", userRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.stack);
  res.status(500).json({ message: "Algo deu errado" });
});

app.listen(port);
