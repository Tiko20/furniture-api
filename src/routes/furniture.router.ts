import express from "express";
import passport from "../middlewares/passport"; // make sure this is your Passport JWT setup
import { furnitureController } from "../controllers/furniture.controller";
import { CreateFurnitureModel } from "../models/create-furniture.model";
import { UpdateFurnitureModel } from "../models/update-furniture.model";
import { GetFurnitureQueryModel } from "../models/get-furniture-query.model";
import { toArray } from "../utils/to-array.util";
import { MaterialEnum } from "../models/material.enum";
import { RoomsEnum } from "../models/rooms.enum";
import { FurnitureStateEnum } from "../models/furniture-state.enum";
import { FurnitureCategoryEnum } from "../models/furniture-category.enum";
import { createFurnitureValidationSchema } from "../validations/create-furniture-validation.schema";
import { updateFurnitureValidationSchema } from "../validations/update-furniture-validation.schema";

const furnitureRouter = express.Router();

// Public routes
furnitureRouter.get("/all", async (_, res) => {
  try {
    const result = await furnitureController.getAllFurniture();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to get all furniture" });
  }
});

furnitureRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await furnitureController.getFurnitureById(Number(id));
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
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
     res.status(500).json({ error });
  }
});

// Protected routes
furnitureRouter.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const furniture: CreateFurnitureModel = req.body;
    const parseData = createFurnitureValidationSchema.safeParse(furniture);
    if (!parseData.success) {
      res.status(400).json(parseData.error.issues);
    } else {
      try {
        const result = await furnitureController.createFurniture(parseData.data);
        res.json({
          message: "Furniture created successfully",
          Furniture: result,
        });
      } catch (error) {
        res.status(500).json({ error });
      }
    }
  }
);

furnitureRouter.put(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    const furniture: UpdateFurnitureModel = req.body;

    const parseData = updateFurnitureValidationSchema.safeParse(furniture);
    if (!parseData.success) {
      res.status(400).json(parseData.error.issues);
    } else {
      try {
        await furnitureController.updateFurniture(Number(id), parseData.data);
        res.json({ message: "Updated successfully" });
      } catch (error) {
        res.status(500).json({ error });
      }
    }
  }
);

furnitureRouter.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    try {
      await furnitureController.deleteFurniture(Number(id));
      res.json({ message: "Deleted successfully" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

export default furnitureRouter;
