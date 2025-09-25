import express from "express";
import { createPet, getAllPets, getPetsById } from "../controllers/petsController.js";

const router = express.Router();

router.get("/", getAllPets);
router.get("/:id", getPetsById);
router.post("/", createPet)

export default router