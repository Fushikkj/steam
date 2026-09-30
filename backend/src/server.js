import express from "express";
import cors from "cors";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import atividadeRoutes from "./routes/atividadeRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ mensagem: "API funcionando!" });
});

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/atividades", atividadeRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});