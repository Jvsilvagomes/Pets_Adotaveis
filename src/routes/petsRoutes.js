import express from "express";
import { createPet, deletePet, getAllPets, getPetsById, updatePet } from "../controllers/petsController.js";

const router = express.Router();

router.get("/", getAllPets);
router.get("/:id", getPetsById);
router.post("/", createPet)
router.delete("/:id", deletePet)
router.put("/:id", updatePet)

export default router