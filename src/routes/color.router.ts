import express from "express";
import passport from "../middlewares/passport"; // make sure this is your passport setup
import { colorController } from "../controllers/color.controller";
import { AddColorModel } from "../models/add-color.model";
import { addColorValidationSchema } from "../validations/add-color-validation.schema";

const colorRouter = express.Router();

// Public route: get all colors
colorRouter.get("/", async (_, res) => {
  try {
    const colors = await colorController.getColors();
    res.json(colors);
  } catch (error) {
    res.json(error);
  }
});

// Protected route: delete a color
colorRouter.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;
      await colorController.deleteColor(Number(id));
      res.json({ message: "Color deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete color" });
    }
  }
);

// Protected route: create a new color
colorRouter.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const color: AddColorModel = req.body;
    const parseData = addColorValidationSchema.safeParse(color);
    if (!parseData.success) {
      res.status(400).json(parseData.error.issues);
    } else {
      try {
        const color = await colorController.addColor(parseData.data);
        res.json({
          message: "Color created successfully",
          color: color,
        });
      } catch (error) {
        res.status(500).json({ error });
      }
    }
  }
);

export default colorRouter;
