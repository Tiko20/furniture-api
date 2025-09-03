import express from "express";
import cors from "cors";
import categoriesRouter from "./routes/categories.router";
import furnitureRouter from "./routes/furniture.router";

const app = express();
app.use(express.urlencoded({ extended: true })); // extended request data


app.use(express.static("public")); //  static files
app.use(cors()); // cors-origin
app.use(express.json()); // body request json


app.use("/api/categories", categoriesRouter);
app.use("/api/furniture", furnitureRouter);
export default app;
