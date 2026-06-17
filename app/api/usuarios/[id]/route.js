
import pool from "@/lib/db";
import { temPermissao } from "@/lib/auth";

function obterTabela(funcao) {
  switch (funcao) {
    case "atleta":
      return "atleta";

    case "tecnico":
      return "tecnico";

    case "administrador":
      return "administrador";

    default:
      return null;
  }
}

export async function PUT(req, context) {
  try {
    if (!temPermissao(req, "administrador")) {
      return Response.json(
        { error: "Sem permissão" },
        { status: 403 }
      );
    }

    const { id } = context.params;

    const {
      nome,
      email,
      funcao
    } = await req.json();

    const tabela =
      obterTabela(funcao);

    if (!tabela) {
      return Response.json(
        {
          error: "Função inválida"
        },
        {
          status: 400
        }
      );
    }

    const result =
      await pool.query(
        `
        UPDATE ${tabela}
        SET
          nome = $1,
          email = $2
        WHERE id = $3
        RETURNING *
        `,
        [
          nome,
          email,
          Number(id)
        ]
      );

    return Response.json(
      result.rows[0]
    );
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        error: "Erro ao atualizar"
      },
      {
        status: 500
      }
    );
  }
}

export async function DELETE(req, context) {
  try {
    if (!temPermissao(req, "administrador")) {
      return Response.json(
        { error: "Sem permissão" },
        { status: 403 }
      );
    }

    const { id } = context.params;

    const { funcao } =
      await req.json();

    const tabela =
      obterTabela(funcao);

    if (!tabela) {
      return Response.json(
        {
          error: "Função inválida"
        },
        {
          status: 400
        }
      );
    }

    await pool.query(
      `
      DELETE FROM ${tabela}
      WHERE id = $1
      `,
      [Number(id)]
    );

    return Response.json({
      ok: true
    });
  } catch (error) {
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

