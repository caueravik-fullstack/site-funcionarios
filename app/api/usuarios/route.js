  import pool from "@/lib/db";
  import bcrypt from "bcrypt";

  // CREATE
  export async function POST(req) {

    try {

      const body = await req.json();

      const {
        nome,
        cargo,
        email,
        telefone,
        senha,
      } = body;

      const senhaHash = await bcrypt.hash(
        senha,
        10
      );

      const result = await pool.query(
        `
        INSERT INTO funcionarios
        (nome,cargo,email,telefone,senha)
        VALUES ($1,$2,$3,$4,$5)
        RETURNING *
        `,
        [
          nome,
          cargo,
          email,
          telefone,
          senhaHash,
        ]
      );

      return Response.json(
        result.rows[0]
      );

    } catch (error) {

      console.log(error);

      return Response.json(
        {
          error: "Erro ao cadastrar",
        },
        {
          status: 500,
        }
      );

    }

  }

  // READ
  export async function GET() {

    const result = await pool.query(
      "SELECT * FROM funcionarios ORDER BY id DESC"
    );

    return Response.json(
      result.rows
    );

  }

  
  
  export async function PUT(req) {

  try {

    const {
      id,
      nome,
      cargo,
      email,
      telefone
    } = await req.json();

    const result = await pool.query(
      `
      UPDATE funcionarios
      SET
        nome = $1,
        cargo = $2,
        email = $3,
        telefone = $4
      WHERE id = $5
      RETURNING *
      `,
      [
        nome,
        cargo,
        email,
        telefone,
        id
      ]
    );

    return Response.json(
      result.rows[0]
    );

  } catch(error) {

    console.log(error);

    return Response.json(
      {
        error:
          "Erro ao atualizar"
      },
      {
        status: 500
      }
    );

  }

}


  export async function DELETE(req) {

  try {

    const { id } =
      await req.json();

    await pool.query(
      `
      DELETE FROM funcionarios
      WHERE id = $1
      `,
      [id]
    );

    return Response.json({
      ok: true,
    });

  } catch(error) {

    console.log(error);

    return Response.json(
      {
          error: "Erro ao excluir"
      },
      {
        status: 500
      }
    );

  }

}


