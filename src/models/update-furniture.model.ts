import { FurnitureStateEnum } from "./furniture-state.enum";


export interface UpdateFurnitureModel {
  price?: number;
  subtitle?: string;
  description?: string;
  state?: FurnitureStateEnum;
}
