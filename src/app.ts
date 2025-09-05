import express from "express";
import cors from "cors";
import furnitureRouter from "./routes/furniture.router";
import colorRouter from "./routes/color.router";
import passport from "./middlewares/passport";
import appConfigsRouter from "./routes/app-configs.router";
import userRouter from "./routes/user.router";

const app = express();
app.use(express.urlencoded({ extended: true })); // extended request data

app.use(express.static("public")); //  static files
app.use(cors()); // cors-origin
app.use(express.json()); // body request json

app.use(passport.initialize());

app.use("/api/furniture", furnitureRouter);
app.use("/api/color", colorRouter);
app.use("/api/config", appConfigsRouter);
app.use("/api/user", userRouter)
export default app;
