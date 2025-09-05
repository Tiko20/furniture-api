import express from "express";
import passport from "../middlewares/passport";
import { userController } from "../controllers/user.controller";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { userLoginValidationSchema } from "../validations/user-login-validation.schema";
import { TOKEN_EXPIRY } from "../constants/constants";
import { userValidationSchema } from "../validations/user-validation.schem";

dotenv.config();
const secret = process.env.JWT_SECRET || "supersecret";

const userRouter = express.Router();

// ✅ Register a new user
userRouter.post("/register", async (req, res) => {
  const parseData = userValidationSchema.safeParse(req.body);

  if (!parseData.success) {
    return res.status(400).json(parseData.error.issues);
  }

  try {
    const { username, password } = parseData.data;

    // Check if user already exists
    const existingUser = await userController.getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Create new user
    const newUser = await userController.createUser(username, password);
    res.json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


// ✅ Login user
userRouter.post("/login", async (req, res) => {
  const userData = req.body;
  const parseData = userLoginValidationSchema.safeParse(userData);

  if (!parseData.success) {
    res.status(400).json(parseData.error.issues);
  } else {
    try {
      const { username, password } = parseData.data;
      const user = await userController.authenticate(username, password);

      if (!user) return res.status(401).json({ error: "Invalid credentials" });

      const token = jwt.sign({ id: user.id }, secret, {
        expiresIn: TOKEN_EXPIRY,
      });

      res.json({ message: "Login successful", token });
    } catch (error) {
      res.json({ error });
    }
  }
});

// ✅ Get current user (protected route)
userRouter.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      res.json({ user: req.user });
    } catch (error) {
      res.json({ error });
    }
  }
);

export default userRouter;
