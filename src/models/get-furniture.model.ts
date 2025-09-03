import { BannerImgType } from "./banner-img.type";
import { SortFilterEnum } from "./sort-filter.enum";

export interface GetFurnitureModel {
  page?: number;
  colorId?: number[];
  materialId?: number[];
  roomCategoryIds?: number[];
  minPrice?: number;
  maxPrice?: number;
  sort?: SortFilterEnum;
  bannerImgTypes?: BannerImgType[];
}
