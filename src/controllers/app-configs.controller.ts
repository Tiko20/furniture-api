import pool from "../db/connect-db";

export const appConfigsController = {
  async getConfig() {
    try {
      const { rows } = await pool.query(
        "SELECT configs FROM app_configs LIMIT 1"
      );
      if (rows.length === 0) return null;
      return rows[0].configs; // JSON stored in Postgres
    } catch (error) {
      return error;
    }
  },

  async updateConfig(config: string) {
    try {
      const query = "UPDATE app_configs SET configs = $1 RETURNING configs";
      const { rows } = await pool.query(query, [config]);

      return rows[0].configs;
    } catch (error) {
      return error;
    }
  },
};
