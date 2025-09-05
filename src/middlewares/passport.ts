import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
import { userController } from "../controllers/user.controller";

dotenv.config();

const secret = process.env.JWT_SECRET || "supersecret";

// JWT options
const opts = {
  // Extract JWT from Authorization header as Bearer token
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

// Define the strategy
passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      // Fetch user by ID from payload
      const user = await userController.getUserById(jwtPayload.id);
      if (user) return done(null, user); // attach user to req.user
      return done(null, false); // user not found
    } catch (err) {
      return done(err, false); // error
    }
  })
);

export default passport;