import pool from "../db/connect-db";
import { GetFurnitureModel } from "../models/get-furniture.model";
import { BannerImgType } from "../models/banner-img.type";
import { CreateFurnitureModel } from "../models/create-furniture.model";
import { UpdateFurnitureModel } from "../models/update-furniture.model";

export const furnitureController = {
  async getFurniture({
    colorId,
    materialId,
    page = 1,
    minPrice,
    maxPrice,
    roomCategoryIds,
    sort,
    bannerImgTypes,
  }: GetFurnitureModel) {
    const values: any[] = [];
    let whereClauses: string[] = [];

    // Color filter
    if (colorId && colorId.length > 0) {
      values.push(...colorId);
      const placeholders = colorId.map(
        (_, i) => `$${values.length - colorId.length + i + 1}`
      );
      whereClauses.push(`color_id IN (${placeholders.join(", ")})`);
    }

    // Material filter
    if (materialId && materialId.length > 0) {
      values.push(...materialId);
      const placeholders = materialId.map(
        (_, i) => `$${values.length - materialId.length + i + 1}`
      );
      whereClauses.push(`material_id IN (${placeholders.join(", ")})`);
    }

    // Room category filter
    if (roomCategoryIds && roomCategoryIds.length > 0) {
      values.push(...roomCategoryIds);
      const placeholders = roomCategoryIds.map(
        (_, i) => `$${values.length - roomCategoryIds.length + i + 1}`
      );
      whereClauses.push(`room_category_id IN (${placeholders.join(", ")})`);
    }
    // Image Banner type

    // Banner image type filter
    if (bannerImgTypes && bannerImgTypes.length > 0) {
      values.push(...bannerImgTypes);
      const placeholders = bannerImgTypes.map(
        (_, i) => `$${values.length - bannerImgTypes.length + i + 1}`
      );
      whereClauses.push(`banner_img_type IN (${placeholders.join(", ")})`);
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
    const offset = (page - 1) * limit; // page 1 → offset 1
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
    description,
    imgSRC,
    price,
    subtitle,
    bannerImgType,
    colorId,
    materialId,
    roomCategoryId,
    state,
  }: CreateFurnitureModel) {
    const query = `INSERT INTO furniture
(description, img_src, price, subtitle, banner_img_type, color_id, material_id, room_category_id, state)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING * `;
    const { rows } = await pool.query(query, [
      description,
      imgSRC,
      price,
      subtitle,
      bannerImgType ?? null,
      colorId,
      materialId,
      roomCategoryId,
      state ?? null,
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
    if (updateData.bannerImgType !== null) {
      fields.push(`banner_img_type = $${index++}`);
      values.push(updateData.bannerImgType);
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
