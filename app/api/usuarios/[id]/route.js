import pool from "@/lib/db";

export async function PUT(req, context) {

  const { id } =
    await context.params;

  const body =
    await req.json();

  const {
    nome,
    cargo,
    email,
    telefone,
  } = body;

  await pool.query(
    `
    UPDATE funcionarios
    SET nome=$1,
        cargo=$2
        email=$3,
        telefone=$4
    WHERE id=$5
    `,
    [
      nome,
      cargo,
      email,
      telefone,
      Number(id),
    ]
  );

  return Response.json({
    ok: true,
  });

}




export async function DELETE(req, context) {

  const { id } =
    await context.params;

  await pool.query(
    `
    DELETE FROM funcionarios
    WHERE id=$1
    `,
    [Number(id)]
  );

  return Response.json({
    ok: true,
  });

}