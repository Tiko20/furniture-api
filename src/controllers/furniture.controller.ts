import pool from "../db/connect-db";
import { GetFurnitureModel } from "../models/get-furniture.model";
import { CreateFurnitureModel } from "../models/create-furniture.model";
import { UpdateFurnitureModel } from "../models/update-furniture.model";

export const furnitureController = {
  async getFurniture({
    colorIds,
    materials,
    categories,
    page = 1,
    minPrice,
    maxPrice,
    roomCategories,
    sort,
    states,
  }: GetFurnitureModel) {
    const values: any[] = [];
    let whereClauses: string[] = [];

    // Color filter
    if (colorIds && colorIds.length > 0) {
      values.push(...colorIds);
      const placeholders = colorIds.map(
        (_, i) => `$${values.length - colorIds.length + i + 1}`
      );
      whereClauses.push(`color_id IN (${placeholders.join(", ")})`);
    }

    // Material filter
    if (materials && materials.length > 0) {
      values.push(...materials);
      const placeholders = materials.map(
        (_, i) => `$${values.length - materials.length + i + 1}`
      );
      whereClauses.push(`material IN (${placeholders.join(", ")})`);
    }

    // Category filter
    if (categories && categories.length > 0) {
      values.push(...categories);
      const placeholders = categories.map(
        (_, i) => `$${values.length - categories.length + i + 1}`
      );
      whereClauses.push(`category IN (${placeholders.join(", ")})`);
    }

    // Room category filter
    if (roomCategories && roomCategories.length > 0) {
      values.push(...roomCategories);
      const placeholders = roomCategories.map(
        (_, i) => `$${values.length - roomCategories.length + i + 1}`
      );
      whereClauses.push(`room_category IN (${placeholders.join(", ")})`);
    }

    // State  filter
    if (states && states.length > 0) {
      values.push(...states);
      const placeholders = states.map(
        (_, i) => `$${values.length - states.length + i + 1}`
      );
      whereClauses.push(`state IN (${placeholders.join(", ")})`);
    }

    // Price filter
    if (minPrice !== undefined) {
      values.push(minPrice);
      whereClauses.push(`price >= $${values.length}`);
    }
    if (maxPrice !== undefined) {
      values.push(maxPrice);
      whereClauses.push(`price <= $${values.length}`);
    }

    // Build query
    let query = "SELECT * FROM furniture";
    if (whereClauses.length > 0) {
      query += " WHERE " + whereClauses.join(" AND ");
    }

    // Sorting
    if (sort) {
      switch (sort) {
        case "dateDesc":
          query += " ORDER BY created_at DESC";
          break;
        case "dateAsc":
          query += " ORDER BY created_at ASC";
          break;
        case "priceLow":
          query += " ORDER BY price ASC";
          break;
        case "priceHigh":
          query += " ORDER BY price DESC";
          break;
      }
    } else {
      query += " ORDER BY created_at DESC"; // default sort
    }

    // Pagination
    const limit = 10;
    const offset = (page - 1) * limit;
    query += ` LIMIT ${limit} OFFSET ${offset}`;

    const { rows } = await pool.query(query, values);
    return rows;
  },

  async getFurnitureById(id: number) {
    const query = "SELECT * FROM furniture WHERE id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },

  async getAllFurniture() {
    const query = "SELECT * FROM furniture";
    const { rows } = await pool.query(query);
    return rows;
  },

  async createFurniture({
    category,
    color_id,
    description,
    img_src,
    material,
    price,
    room_category,
    subtitle,
    state,
  }: CreateFurnitureModel) {
    const query = `INSERT INTO furniture
(category, color_id, description, img_src, material, price, room_category, subtitle,  state)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING * `;
    const { rows } = await pool.query(query, [
      category,
      color_id,
      description,
      img_src,
      material,
      price,
      room_category,
      subtitle,
      state,
    ]);

    return rows[0];
  },

  async updateFurniture(id: number, updateData: UpdateFurnitureModel) {
    const values: any[] = [];
    const fields: string[] = [];
    let index = 1;

    if (updateData.description !== null) {
      fields.push(`description = $${index++}`);
      values.push(updateData.description);
    }
    if (updateData.price !== null) {
      fields.push(`price = $${index++}`);
      values.push(updateData.price);
    }
    if (updateData.state !== null) {
      fields.push(`state = $${index++}`);
      values.push(updateData.state);
    }
    if (updateData.subtitle !== null) {
      fields.push(`subtitle = $${index++}`);
      values.push(updateData.subtitle);
    }

    if (fields.length === 0) return undefined;

    values.push(id);

    const query = `UPDATE furniture SET ${fields.join(
      ", "
    )} WHERE id = $${index} RETURNING *`;

    const result = await pool.query(query, values);
    return result;
  },

  async deleteFurniture(id: number) {
    const query = "DELETE FROM furniture WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result;
  },
};
