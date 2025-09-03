import express from "express";
import { categoriesController } from "../controllers/categories.controller";
import { CreateColorCategoryModel } from "../models/create-color-category.model";

const categoriesRouter = express.Router();

categoriesRouter.get("/colors", async (_, res) => {
  const colors = await categoriesController.getColors();
  res.json(colors);
});

categoriesRouter.get("/furniture", async (_, res) => {
  const furniture = await categoriesController.getFurniture();
  res.json(furniture);
});

categoriesRouter.get("/rooms", async (_, res) => {
  const rooms = await categoriesController.getRoomCategories();
  res.json(rooms);
});

categoriesRouter.get("/materials", async (_, res) => {
  const materials = await categoriesController.getMaterials();
  res.json(materials);
});

categoriesRouter.delete("/color/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await categoriesController.deleteColor(Number(id));
    res.json("Color deleted successfully");
  } catch (error) {
    res.json({ error: "Failed to delete color" });
  }
});

categoriesRouter.post("/color/create", async (req, res) => {
  const { name, code }: CreateColorCategoryModel = req.body;
  try {
    const color = await categoriesController.createColorCategory({
      name,
      code,
    });
    res.status(201).json({
      message: "Color created successfully",
      color: color,
    });
  } catch (error) {
    res.status(500).send({ error: "Failed to create color" });
  }
});

export default categoriesRouter;
