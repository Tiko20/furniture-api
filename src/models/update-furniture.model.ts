import { BannerImgType } from "./banner-img.type";
import { FurnitureState } from "./create-furniture.model";

export interface UpdateFurnitureModel {
  price?: number;
  subtitle?: string;
  description?: string;
  state?: FurnitureState;
  bannerImgType?: BannerImgType;
}
