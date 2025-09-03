import express from "express";
import { furnitureController } from "../controllers/furniture.controller";
import { CreateFurnitureModel } from "../models/create-furniture.model";
import { UpdateFurnitureModel } from "../models/update-furniture.model";
import { GetFurnitureQueryModel } from "../models/get-furniture-query.model";
import { BannerImgType } from "../models/banner-img.type";
import { toArray } from "../utils/to-array.util";

const furnitureRouter = express.Router();

furnitureRouter.get("/", async (req, res) => {
  const {
    bannerImgTypes,
    colorIds,
    materialIds,
    page,
    minPrice,
    maxPrice,
    roomCategoryIds,
    sort,
  } = req.query as unknown as GetFurnitureQueryModel;

  const parsedColorIds = toArray(colorIds, true) as number[];
  const parsedMaterialIds = toArray(materialIds, true) as number[];
  const parsedRoomCategoryIds = toArray(roomCategoryIds, true) as number[];
  const parsedBannerImgTypes = toArray(bannerImgTypes) as BannerImgType[];
  const parsedPage = page ? Number(page) : undefined;
  const parsedMinPrice =
    minPrice !== null && Number(minPrice) ? Number(minPrice) : undefined;
  const parsedMaxPrice =
    maxPrice !== null && Number(maxPrice) ? Number(maxPrice) : undefined;

  try {
    const result = await furnitureController.getFurniture({
      bannerImgTypes: parsedBannerImgTypes,
      colorId: parsedColorIds,
      materialId: parsedMaterialIds,
      page: parsedPage,
      minPrice: parsedMinPrice,
      maxPrice: parsedMaxPrice,
      roomCategoryIds: parsedRoomCategoryIds,
      sort,
    });
    res.json(result);
  } catch (error) {
    res.json({ error: "Get furniture failed" });
  }
});

furnitureRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await furnitureController.getFurnitureById(Number(id));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

furnitureRouter.get("/all", async (_, res) => {
  try {
    const result = await furnitureController.getAllFurniture();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

furnitureRouter.post("/create", async (req, res) => {
  const {
    colorId,
    description,
    imgSRC,
    materialId,
    price,
    roomCategoryId,
    subtitle,
    bannerImgType,
    state,
  }: CreateFurnitureModel = req.body;

  try {
    const result = await furnitureController.createFurniture({
      colorId,
      description,
      imgSRC,
      materialId,
      price,
      roomCategoryId,
      subtitle,
      bannerImgType,
      state,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

furnitureRouter.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const {
    bannerImgType,
    description,
    price,
    state,
    subtitle,
  }: UpdateFurnitureModel = req.body;

  try {
    await furnitureController.updateFurniture(Number(id), {
      bannerImgType,
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
