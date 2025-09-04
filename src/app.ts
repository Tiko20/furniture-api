import express from "express";
import cors from "cors";
import furnitureRouter from "./routes/furniture.router";
import colorRouter from "./routes/color.router";

const app = express();
app.use(express.urlencoded({ extended: true })); // extended request data


app.use(express.static("public")); //  static files
app.use(cors()); // cors-origin
app.use(express.json()); // body request json


app.use("/api/color",colorRouter );
app.use("/api/furniture", furnitureRouter);
export default app;
