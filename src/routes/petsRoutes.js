import express from "express";
import { getAllPets } from "../controllers/petsController.js";

const router = express.Router();

router.get("/", getAllPets);

export default router