import express from "express";
import { categoriesController } from "../controllers/categories.controller";
import { CreateColorCategoryModel } from "../models/create-color-category.model";

const categoriesRouter = express.Router();

categoriesRouter.get("/colors", async (req, res) => {
  const colors = await categoriesController.getColors();
  res.json(colors);
});

categoriesRouter.get("/furniture", async (req, res) => {
  const furniture = await categoriesController.getFurniture();
  res.json(furniture);
});

categoriesRouter.get("/rooms", async (req, res) => {
  const rooms = await categoriesController.getRoomCategories();
  res.json(rooms);
});

categoriesRouter.get("/materials", async (req, res) => {
  const materials = await categoriesController.getMaterials();
  res.json(materials);
});

categoriesRouter.delete("/delete-color", async (req, res) => {
  try {
    const { id } = req.body;
     await categoriesController.deleteColor(id);
    res.status(204).json({ "Color deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete color" });
  }
});

categoriesRouter.post("/create-color", async (req, res) => {
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
