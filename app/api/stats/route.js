import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT COUNT(*) FROM funcionarios"
    );

    const count = parseInt(result.rows[0].count);

    return NextResponse.json({ funcionarios: count });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar stats" }, { status: 500 });
  }
}