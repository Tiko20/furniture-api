import express from "express";
import { colorController } from "../controllers/color.controller";
import { AddColorModel } from "../models/add-color.model";

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

colorRouter.post("/color/create", async (req, res) => {
  const { name, code, title }: AddColorModel = req.body;
  try {
    const color = await colorController.addColor({
      name,
      code,
      title,
    });
    res.json({
      message: "Color created successfully",
      color: color,
    });
  } catch (error) {
    res.json(error);
  }
});

export default colorRouter;
