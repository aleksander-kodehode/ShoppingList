import express, { Request, Response } from "express";
import "dotenv/config";
import getUserPost from "./routes/getUserListsRoute";

const app = express();

//middleware
app.use(express.json());

//routing;
app.use("/lists/", getUserPost);

app.listen(process.env.APP_PORT);
console.log(`App running on port: ${process.env.APP_PORT}`);
