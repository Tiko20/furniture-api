import { BannerImgType } from "./banner-img.type";

export type FurnitureState = "sale" | "new";

export interface CreateFurnitureModel {
  colorId: number;
  materialId: number;
  roomCategoryId: number;
  price: number;
  subtitle: string;
  description: string;
  state?: FurnitureState;
  imgSRC: string;
  bannerImgType?: BannerImgType;
}

