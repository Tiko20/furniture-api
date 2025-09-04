import { FurnitureStateEnum } from "./furniture-state.enum";
import { SortFilterEnum } from "./sort-filter.enum";

export interface GetFurnitureQueryModel {
  page?: string;
  colorIds?: string[];
  categories?: string[];
  materials?: string[];
  roomCategories?: string[];
  minPrice?: string[];
  maxPrice?: string[];
  sort?: SortFilterEnum;
  states?: FurnitureStateEnum[];
}
