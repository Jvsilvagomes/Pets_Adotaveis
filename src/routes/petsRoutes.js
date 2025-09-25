import express from "express";
import { getAllPets, getPetsById } from "../controllers/petsController.js";

const router = express.Router();

router.get("/", getAllPets);
router.get("/:id", getPetsById);

export default router