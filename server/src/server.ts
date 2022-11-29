import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./routes";
import { corsConfig } from "./config/cors.config";

const PORT = process.env.APP_PORT || 3500;
const app = express();

//middleware
app.use(express.json());
app.use(cors(corsConfig));
app.use(express.urlencoded({ extended: true }));

//routing;
app.use(router);

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});
