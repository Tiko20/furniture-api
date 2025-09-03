import pool from "../db/connect-db";
import { CreateColorCategoryModel } from "../models/create-color-category.model";

export const categoriesController = {
  async getColors() {
    const query = "SELECT * FROM color_category";
    const { rows } = await pool.query(query);
    return rows;
  },

  async getRoomCategories() {
    const query = "SELECT * FROM room_category";
    const { rows } = await pool.query(query);
    return rows;
  },

  async getMaterials() {
    const query = "SELECT * FROM material_category";
    const { rows } = await pool.query(query);
    return rows;
  },

  async getFurniture() {
    const query = "SELECT * FROM furniture_category";
    const { rows } = await pool.query(query);
    return rows;
  },

  async createColorCategory(colorCategoryData: CreateColorCategoryModel) {
    const query =
      "INSERT INTO color_category (name, code) VALUES ($1,$2) RETURNING id, name";
    const { rows } = await pool.query(query, [
      colorCategoryData.name,
      colorCategoryData.code,
    ]);
    return rows[0];
  },

  async deleteColor(id: number) {
    const query = "DELETE FROM color_category  WHERE id = $1";
    const { rowCount } = await pool.query(query, [id]);
    return rowCount;
  },
};
