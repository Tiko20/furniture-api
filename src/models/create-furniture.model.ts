import { FurnitureCategoryEnum } from "./furniture-category.enum";
import { FurnitureStateEnum } from "./furniture-state.enum";
import { MaterialEnum } from "./material.enum";
import { RoomsEnum } from "./rooms.enum";

export interface CreateFurnitureModel {
  category: FurnitureCategoryEnum;
  state: FurnitureStateEnum;
  subtitle: string;
  description: string;
  price: number;
  img_src: string;
  color_id: number;
  material: MaterialEnum;
  room_category: RoomsEnum;
}
