import pool from "@/lib/db";

export async function GET() {
  const result = await pool.query(`SELECT * FROM treino ORDER BY data_treino ASC`);
  return Response.json(result.rows);
}