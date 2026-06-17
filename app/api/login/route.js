
import pool from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { gerarToken } from "@/lib/auth";

export async function POST(req) {
  try {
    const body = await req.json();

    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "desconhecido";

    let result = await pool.query(
      "SELECT * FROM atleta WHERE email = $1",
      [body.email]
    );

    if (result.rows.length === 0) {
      result = await pool.query(
        "SELECT * FROM tecnico WHERE email = $1",
        [body.email]
      );
    }

    if (result.rows.length === 0) {
      result = await pool.query(
        "SELECT * FROM administrador WHERE email = $1",
        [body.email]
      );
    }

    const usuario = result.rows[0];

    if (!usuario) {
      await pool.query(
        `
        INSERT INTO log_acesso
        (
          email,
          acao,
          ip
        )
        VALUES
        (
          $1,
          $2,
          $3
        )
        `,
        [
          body.email,
          "EMAIL_INVALIDO",
          ip
        ]
      );

      return NextResponse.json(
        {
          error: "Email inválido"
        },
        {
          status: 401
        }
      );
    }

    const senhaCorreta =
      await bcrypt.compare(
        body.senha,
        usuario.senha
      );

    if (!senhaCorreta) {
      await pool.query(
        `
        INSERT INTO log_acesso
        (
          usuario_id,
          email,
          acao,
          ip
        )
        VALUES
        (
          $1,
          $2,
          $3,
          $4
        )
        `,
        [
          usuario.id,
          usuario.email,
          "SENHA_INVALIDA",
          ip
        ]
      );

      return NextResponse.json(
        {
          error: "Senha inválida"
        },
        {
          status: 401
        }
      );
    }

    await pool.query(
      `
      INSERT INTO log_acesso
      (
        usuario_id,
        email,
        acao,
        ip
      )
      VALUES
      (
        $1,
        $2,
        $3,
        $4
      )
      `,
      [
        usuario.id,
        usuario.email,
        "LOGIN",
        ip
      ]
    );

    const token =
      gerarToken(usuario);

    const {
      senha,
      ...usuarioSemSenha
    } = usuario;

    return NextResponse.json({
      token,
      usuario: usuarioSemSenha
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Erro ao realizar login"
      },
      {
        status: 500
      }
    );
  }
}

