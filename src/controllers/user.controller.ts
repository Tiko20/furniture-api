import { PASSWORD_SALT_ROUNDS } from "../constants/constants";
import pool from "../db/connect-db";
import bcrypt from "bcrypt";

export const userController = {
  // Get user by ID (for Passport JWT)
  async getUserById(id: number) {
    try {
      const result = await pool.query(
        "SELECT id, username, role FROM users WHERE id = $1",
        [id]
      );
      if (result.rows.length === 0) return null; // user not found
      return result.rows[0]; // safe: no password included
    } catch (error) {
      return error;
    }
  },

  // Authenticate user by username + password
  async authenticate(username: string, password: string) {
    try {
      const result = await pool.query(
        "SELECT id, username, password FROM users WHERE username = $1",
        [username]
      );

      if (result.rows.length === 0) return null;

      const user = result.rows[0];

      // Compare plain password with hashed password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return null;

      // Return user object without password
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      return error;
    }
  },

  // Create a new user
  async createUser(username: string, password: string) {
    try {
      const hashedPassword = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS);
      const result = await pool.query(
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
        [username, hashedPassword]
      );
      return result.rows[0];
    } catch (error) {
      return error;
    }
  },
  async getUserByUsername(
    username: string
  ): Promise<{ id: number; username: string; password: string } | null> {
    try {
      const query =
        "SELECT id, username, password FROM users WHERE username = $1";
      const { rows } = await pool.query(query, [username]);
      if (rows.length === 0) return null; // no user found
      return rows[0];
    } catch (error) {
      return null;
    }
  },
};
