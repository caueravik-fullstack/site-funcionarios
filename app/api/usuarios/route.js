
import pool from "@/lib/db";
import bcrypt from "bcrypt";
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

// CADASTRAR
export async function POST(req) {
  try {
    const body = await req.json();

    const {
      nome,
      email,
      senha,
      tipoUsuario,
    } = body;

    const tabela =
      obterTabela(tipoUsuario);

    if (!tabela) {
      return Response.json(
        {
          error:
            "Tipo de usuário inválido",
        },
        {
          status: 400,
        }
      );
    }

    const existe =
      await pool.query(
        `
        SELECT id
        FROM usuarios
        WHERE email = $1
        `,
        [email]
      );

    if (existe.rows.length > 0) {
      return Response.json(
        {
          error:
            "Email já cadastrado",
        },
        {
          status: 400,
        }
      );
    }

    const senhaHash =
      await bcrypt.hash(
        senha,
        10
      );

    const result =
      await pool.query(
        `
        INSERT INTO ${tabela}
        (
          nome,
          email,
          senha
        )
        VALUES ($1,$2,$3)
        RETURNING *
        `,
        [
          nome,
          email,
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
        error:
          "Erro ao cadastrar",
      },
      {
        status: 500,
      }
    );
  }
}

// LISTAR
export async function GET() {
  try {
    const atletas =
      await pool.query(`
        SELECT
          id,
          nome,
          email,
          'atleta' AS funcao
        FROM atleta
      `);

    const tecnicos =
      await pool.query(`
        SELECT
          id,
          nome,
          email,
          'tecnico' AS funcao
        FROM tecnico
      `);

    const administradores =
      await pool.query(`
        SELECT
          id,
          nome,
          email,
          'administrador' AS funcao
        FROM administrador
      `);

    const usuarios = [
      ...atletas.rows,
      ...tecnicos.rows,
      ...administradores.rows,
    ];

    usuarios.sort(
      (a, b) => b.id - a.id
    );

    return Response.json(
      usuarios
    );
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        error:
          "Erro ao buscar usuários",
      },
      {
        status: 500,
      }
    );
  }
}

// EDITAR
export async function PUT(req) {
  try {
    if (
      !temPermissao(
        req,
        "administrador"
      )
    ) {
      return Response.json(
        {
          error:
            "Sem permissão",
        },
        {
          status: 403,
        }
      );
    }

    const {
      id,
      nome,
      email,
      funcao,
    } = await req.json();

    const tabela =
      obterTabela(funcao);

    if (!tabela) {
      return Response.json(
        {
          error:
            "Função inválida",
        },
        {
          status: 400,
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
          id,
        ]
      );

    return Response.json(
      result.rows[0]
    );
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        error:
          "Erro ao atualizar",
      },
      {
        status: 500,
      }
    );
  }
}

// EXCLUIR
export async function DELETE(req) {
  try {
    if (
      !temPermissao(
        req,
        "administrador"
      )
    ) {
      return Response.json(
        {
          error:
            "Sem permissão",
        },
        {
          status: 403,
        }
      );
    }

    const {
      id,
      funcao,
    } = await req.json();

    const tabela =
      obterTabela(funcao);

    if (!tabela) {
      return Response.json(
        {
          error:
            "Função inválida",
        },
        {
          status: 400,
        }
      );
    }

    await pool.query(
      `
      DELETE FROM ${tabela}
      WHERE id = $1
      `,
      [id]
    );

    return Response.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        error:
          "Erro ao excluir",
      },
      {
        status: 500,
      }
    );
  }
}

