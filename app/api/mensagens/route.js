import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM mensagens ORDER BY data DESC"
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar mensagens" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { nome, email, mensagem } = await req.json();

    await pool.query(
      "INSERT INTO mensagens (nome, email, mensagem) VALUES ($1, $2, $3)",
      [nome, email, mensagem]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao enviar mensagem" }, { status: 500 });
  }
} 