import { pool } from "../config/db.js";

export async function listarUsuarios(req, res) {
    try {
        const resultado = await pool.query(
            "SELECT * FROM usuario ORDER BY id_usuario"
        );

        res.json(resultado.rows);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao listar usuários" });
    }
}

export async function buscarUsuario(req, res) {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            "SELECT * FROM usuario WHERE id_usuario = $1",
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }

        res.json(resultado.rows[0]);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao buscar usuário" });
    }
}

export async function criarUsuario(req, res) {
    try {
        const { nome, email, senha } = req.body;

        const resultado = await pool.query(
            `INSERT INTO usuario (nome, email, senha)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [nome, email, senha]
        );

        res.status(201).json(resultado.rows[0]);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao criar usuário" });
    }
}

export async function atualizarUsuario(req, res) {
    try {
        const { id } = req.params;
        const { nome, email, senha } = req.body;

        const resultado = await pool.query(
            `UPDATE usuario
             SET nome = $1, email = $2, senha = $3
             WHERE id_usuario = $4
             RETURNING *`,
            [nome, email, senha, id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }

        res.json(resultado.rows[0]);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao atualizar usuário" });
    }
}

export async function deletarUsuario(req, res) {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            "DELETE FROM usuario WHERE id_usuario = $1 RETURNING *",
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }

        res.json({ mensagem: "Usuário excluído com sucesso" });
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao excluir usuário" });
    }
}