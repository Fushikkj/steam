import { pool } from "../config/db.js";

export async function listarAtividades(req, res) {
    try {
        const resultado = await pool.query(
            "SELECT * FROM atividade ORDER BY id_atividade"
        );

        res.json(resultado.rows);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao listar atividades" });
    }
}

export async function buscarAtividade(req, res) {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            "SELECT * FROM atividade WHERE id_atividade = $1",
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensagem: "Atividade não encontrada" });
        }

        res.json(resultado.rows[0]);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao buscar atividade" });
    }
}

export async function criarAtividade(req, res) {
    try {
        const { id_usuario, tipo_atividade, data_atividade } = req.body;

        const resultado = await pool.query(
            `INSERT INTO atividade
            (id_usuario, tipo_atividade, data_atividade)
            VALUES ($1, $2, $3)
            RETURNING *`,
            [id_usuario, tipo_atividade, data_atividade]
        );

        res.status(201).json(resultado.rows[0]);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao criar atividade" });
    }
}

export async function atualizarAtividade(req, res) {
    try {
        const { id } = req.params;
        const { id_usuario, tipo_atividade, data_atividade } = req.body;

        const resultado = await pool.query(
            `UPDATE atividade
             SET id_usuario = $1,
                 tipo_atividade = $2,
                 data_atividade = $3
             WHERE id_atividade = $4
             RETURNING *`,
            [id_usuario, tipo_atividade, data_atividade, id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensagem: "Atividade não encontrada" });
        }

        res.json(resultado.rows[0]);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao atualizar atividade" });
    }
}

export async function deletarAtividade(req, res) {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            "DELETE FROM atividade WHERE id_atividade = $1 RETURNING *",
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensagem: "Atividade não encontrada" });
        }

        res.json({ mensagem: "Atividade excluída com sucesso" });
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao excluir atividade" });
    }
}