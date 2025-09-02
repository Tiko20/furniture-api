import express from "express";
import cors from "cors";
import categoriesRouter from "./routes/categories.router";

const app = express();
app.use(express.urlencoded({ extended: true })); // extended request data

// app.use(
//   session({
//     secret: sessionSecretKey,
//     resave: false,
//     saveUninitialized: false,
//   })
// );

app.use(express.static("public")); //  static files
app.use(cors()); // cors-origin
app.use(express.json()); // body request json
// app.use(flash());

// app.use(passport.initialize());
// app.use(passport.session());

app.use("/api/categories", categoriesRouter);
export default app;
