import pool from "../db/connect-db";
import { AddColorModel } from "../models/add-color.model";

export const colorController = {
  async getColors() {
    const query = "SELECT * FROM colors";
    const { rows } = await pool.query(query);
    return rows;
  },

  async addColor(colorCategoryData: AddColorModel) {
    const query =
      "INSERT INTO colors (name, code, title) VALUES ($1,$2,$3) RETURNING *";
    const { rows } = await pool.query(query, [
      colorCategoryData.name,
      colorCategoryData.code,
      colorCategoryData.title,
    ]);
    return rows[0];
  },

  async deleteColor(id: number) {
    const query = "DELETE FROM colors WHERE id = $1";
    const { rowCount } = await pool.query(query, [id]);
    return rowCount;
  },
};
