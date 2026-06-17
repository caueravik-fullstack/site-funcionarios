
import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT *
      FROM auditoria
      ORDER BY data_hora DESC
      LIMIT 200
    `);

    return Response.json(
      result.rows
    );
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        error:
          "Erro ao buscar auditoria"
      },
      {
        status: 500
      }
    );
  }
}

