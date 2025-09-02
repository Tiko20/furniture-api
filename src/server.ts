import { config } from "dotenv";
import app from "./app";

config();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📑 Swagger docs available at http://localhost:${PORT}/api-docs`);
});
