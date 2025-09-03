import { BannerImgType } from "./banner-img.type";
import { SortFilterEnum } from "./sort-filter.enum";

export interface GetFurnitureQueryModel {
  page?: string;
  colorIds?: string[];
  materialIds?: string[];
  roomCategoryIds?: string[];
  minPrice?: string[];
  maxPrice?: string[];
  sort?: SortFilterEnum;
  bannerImgTypes?: BannerImgType;
}
