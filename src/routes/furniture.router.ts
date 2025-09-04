import express from "express";
import { furnitureController } from "../controllers/furniture.controller";
import { CreateFurnitureModel } from "../models/create-furniture.model";
import { UpdateFurnitureModel } from "../models/update-furniture.model";
import { GetFurnitureQueryModel } from "../models/get-furniture-query.model";
import { toArray } from "../utils/to-array.util";
import { MaterialEnum } from "../models/material.enum";
import { RoomsEnum } from "../models/rooms.enum";
import { FurnitureStateEnum } from "../models/furniture-state.enum";
import { FurnitureCategoryEnum } from "../models/furniture-category.enum";

const furnitureRouter = express.Router();

furnitureRouter.get("/all", async (_, res) => {
  try {
    const result = await furnitureController.getAllFurniture();
    res.json(result);
  } catch (error) {
    res.json({ error: "Failed to get all furniture" });
  }
});

furnitureRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await furnitureController.getFurnitureById(Number(id));
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

furnitureRouter.get("/", async (req, res) => {
  const {
    states,
    categories,
    colorIds,
    materials,
    page,
    minPrice,
    maxPrice,
    roomCategories,
    sort,
  } = req.query as unknown as GetFurnitureQueryModel;

  const parsedColorIds = toArray(colorIds, true) as number[];
  const parsedMaterials = toArray(materials) as MaterialEnum[];
  const parsedRoomCategory = toArray(roomCategories) as RoomsEnum[];
  const parsedStates = toArray(states) as FurnitureStateEnum[];
  const parsedCategories = toArray(categories) as FurnitureCategoryEnum[];
  const parsedPage = page ? Number(page) : undefined;
  const parsedMinPrice =
    minPrice !== undefined && !isNaN(Number(minPrice))
      ? Number(minPrice)
      : undefined;

  const parsedMaxPrice =
    maxPrice !== undefined && !isNaN(Number(maxPrice))
      ? Number(maxPrice)
      : undefined;

  try {
    const result = await furnitureController.getFurniture({
      states: parsedStates,
      categories: parsedCategories,
      colorIds: parsedColorIds,
      materials: parsedMaterials,
      page: parsedPage,
      minPrice: parsedMinPrice,
      maxPrice: parsedMaxPrice,
      roomCategories: parsedRoomCategory,
      sort,
    });
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

furnitureRouter.post("/create", async (req, res) => {
  const {
    category,
    color_id,
    description,
    img_src,
    material,
    price,
    room_category,
    subtitle,
    state,
  }: CreateFurnitureModel = req.body;

  try {
    const result = await furnitureController.createFurniture({
      category,
      color_id,
      description,
      img_src,
      material,
      price,
      room_category,
      subtitle,
      state,
    });
    res.json(result);
  } catch (error) {
    res.json({ error: error });
  }
});

furnitureRouter.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { description, price, state, subtitle }: UpdateFurnitureModel =
    req.body;

  try {
    await furnitureController.updateFurniture(Number(id), {
      description,
      price,
      state,
      subtitle,
    });

    res.json("Updated successfully");
  } catch (error) {
    res.json(error);
  }
});

furnitureRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await furnitureController.deleteFurniture(Number(id));
    res.json("Deleted successfully");
  } catch (error) {
    res.json(error);
  }
});

export default furnitureRouter;
