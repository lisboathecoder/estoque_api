import express from "express";
import { createProduto, getAllProdutos, getByIdProdutos } from "../controllers/estoqueController.js";

const router = express.Router();

router.get("/", getAllProdutos);
router.get("/:id", getByIdProdutos);
router.post("/", createProduto);

export default router;