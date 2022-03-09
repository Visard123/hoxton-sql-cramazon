import express, { json } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
const prisma = new PrismaClient();

app.listen(4000, () => {
  console.log(`Server runing in:http://localhost:4006`);
});
