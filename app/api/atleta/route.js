import pool from "@/lib/db";
import bcrypt from "bcryptjs";
import { obterUsuario, temPermissao } from "@/lib/auth";

export async function POST(req) {
  try {
    const { nome, email, senha, posicao, altura, peso } = await req.json();

    const senhaHash = await bcrypt.hash(senha, 10);

    const result = await pool.query(
      `INSERT INTO atleta (nome, email, senha, posicao, altura, peso)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING *`,
      [nome, email, senhaHash, posicao, altura, peso]
    );

    return Response.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Erro ao cadastrar atleta" }, { status: 500 });
  }
}

export async function GET(req) {
  if (!obterUsuario(req)) {
    return Response.json({ error: "Não autenticado" }, { status: 401 });
  }

  const result = await pool.query(`SELECT * FROM atleta ORDER BY id DESC`);
  return Response.json(result.rows);
}

export async function PUT(req) {
  if (!temPermissao(req, "tecnico", "administrador")) {
    return Response.json({ error: "Sem permissão" }, { status: 403 });
  }

  try {
    const { id, nome, email, posicao, altura, peso } = await req.json();

    const result = await pool.query(
      `UPDATE atleta SET nome=$1, email=$2, posicao=$3, altura=$4, peso=$5 WHERE id=$6 RETURNING *`,
      [nome, email, posicao, altura, peso, id]
    );

    return Response.json(result.rows[0]);
  } catch (error) {
    return Response.json({ error: "Erro ao atualizar atleta" }, { status: 500 });
  }
}

export async function DELETE(req) {
  if (!temPermissao(req, "administrador")) {
    return Response.json({ error: "Sem permissão" }, { status: 403 });
  }

  try {
    const { id } = await req.json();
    await pool.query(`DELETE FROM atleta WHERE id=$1`, [id]);
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: "Erro ao excluir atleta" }, { status: 500 });
  }
}