import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [atletas, tecnicos, administradores, auditorias, ultimasAuditorias, ultimosUsuarios, treinos] = await Promise.all([
      pool.query("SELECT COUNT(*) FROM atleta"),
      pool.query("SELECT COUNT(*) FROM tecnico"),
      pool.query("SELECT COUNT(*) FROM administrador"),
      pool.query("SELECT COUNT(*) FROM auditoria"),
      pool.query("SELECT * FROM auditoria ORDER BY data_hora DESC LIMIT 5"),
      pool.query("SELECT nome, email FROM usuarios ORDER BY id DESC LIMIT 5"),
      pool.query("SELECT COUNT(*) FROM treino"),
    ]);

    const usuarios =
      Number(atletas.rows[0].count) +
      Number(tecnicos.rows[0].count) +
      Number(administradores.rows[0].count);

    return NextResponse.json({
      usuarios,
      atletas: Number(atletas.rows[0].count),
      tecnicos: Number(tecnicos.rows[0].count),
      administradores: Number(administradores.rows[0].count),
      auditorias: Number(auditorias.rows[0].count),
      treinos: Number(treinos.rows[0].count),
      ultimasAuditorias: ultimasAuditorias.rows,
      ultimosUsuarios: ultimosUsuarios.rows,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao carregar estatísticas" }, { status: 500 });
  }
}