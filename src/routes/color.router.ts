import express from "express";
import { colorController } from "../controllers/color.controller";
import { AddColorModel } from "../models/add-color.model";
import { addColorValidationSchema } from "../validations/add-color-validation.schema";

const colorRouter = express.Router();

colorRouter.get("/", async (_, res) => {
  const colors = await colorController.getColors();
  res.json(colors);
});

colorRouter.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await colorController.deleteColor(Number(id));
    res.json("Color deleted successfully");
  } catch (error) {
    res.json({ error: "Failed to delete color" });
  }
});

colorRouter.post("/create", async (req, res) => {
  const color: AddColorModel = req.body;
  const parseData = addColorValidationSchema.safeParse(color);
  if (!parseData.success) {
    res.status(500).json(parseData.error.issues);
  } else {
    try {
      const color = await colorController.addColor(parseData.data);
      res.json({
        message: "Color created successfully",
        color: color,
      });
    } catch (error) {
      res.json(error);
    }
  }
});

export default colorRouter;
