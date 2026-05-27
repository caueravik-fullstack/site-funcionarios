import pool from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const body = await req.json();

    // Buscar usuário
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [body.email]
    );

    const usuario = result.rows[0];

    if (!usuario) {
      return NextResponse.json({ error: "Email inválido" }, { status: 401 });
    }

    // Validar senha
    const senhaCorreta = await bcrypt.compare(body.senha, usuario.senha);

    if (!senhaCorreta) {
      return NextResponse.json({ error: "Senha inválida" }, { status: 401 });
    }

    // Gerar token
    const token = jwt.sign(
      { id: usuario.id },
      process.env.JWT_SECRET || "segredo",
      { expiresIn: "1d" }
    );

    return NextResponse.json({ token, usuario });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao realizar login" }, { status: 500 });
  }
}