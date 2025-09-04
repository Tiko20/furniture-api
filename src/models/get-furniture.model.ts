import { FurnitureCategoryEnum } from "./furniture-category.enum";
import { FurnitureStateEnum } from "./furniture-state.enum";
import { MaterialEnum } from "./material.enum";
import { RoomsEnum } from "./rooms.enum";
import { SortFilterEnum } from "./sort-filter.enum";

export interface GetFurnitureModel {
  page?: number;
  colorIds?: number[];
  categories?: FurnitureCategoryEnum[];
  materials?: MaterialEnum[];
  roomCategories?: RoomsEnum[];
  minPrice?: number;
  maxPrice?: number;
  sort?: SortFilterEnum;
  states?: FurnitureStateEnum[];
}
