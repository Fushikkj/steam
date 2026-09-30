import express from "express";

import {
    listarAtividades,
    buscarAtividade,
    criarAtividade,
    atualizarAtividade,
    deletarAtividade
} from "../controllers/atividadeController.js";

const router = express.Router();

router.get("/", listarAtividades);
router.get("/:id", buscarAtividade);
router.post("/", criarAtividade);
router.put("/:id", atualizarAtividade);
router.delete("/:id", deletarAtividade);

export default router;