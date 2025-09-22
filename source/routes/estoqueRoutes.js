import express from "express";
import { createProduto, deleteProduto, getAllProdutos, getByIdProdutos, updateProduto } from "../controllers/estoqueController.js";

const router = express.Router();

router.get("/", getAllProdutos);
router.get("/:id", getByIdProdutos);
router.post("/", createProduto);
router.put("/:id", updateProduto);
router.delete("/:id", deleteProduto)

export default router;