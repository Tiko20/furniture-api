import express from "express";
import passport from "../middlewares/passport"; // make sure this is your passport setup
import { appConfigsController } from "../controllers/app-configs.controller";
import { authorizeRole } from "../middlewares/authorize-role";
import { UserRoleEnum } from "../models/user-role.enum";

const router = express.Router();

const appConfigsRouter = router;

appConfigsRouter.get("/", async (_, res) => {
  try {
    const configs = await appConfigsController.getConfig();
    res.json(configs);
  } catch (error) {
    res.json(error);
  }
});

appConfigsRouter.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  authorizeRole(UserRoleEnum.SUPER_ADMIN),
  async (req, res) => {
    const { configs } = req.body;
    try {
      await appConfigsController.updateConfig(configs);
      res.json({ message: "Configs update successfully" });
    } catch (error) {
      res.json(error);
    }
  }
);
appConfigsController.updateConfig;

export default appConfigsRouter;
