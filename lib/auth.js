import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "segredo123";
export function gerarToken(usuario) {
return jwt.sign(
{
id: usuario.id,
nome: usuario.nome,
email: usuario.email,
funcao: usuario.funcao,
},
SECRET,
{
expiresIn: "1d",
}
);
}

export function verificarToken(token) {
try {
return jwt.verify(token, SECRET);
} catch {
return null;
}
}

export function obterUsuario(req) {
try {
const authHeader =
req.headers.get("authorization");


if (!authHeader) {
  return null;
}

const token =
  authHeader.replace("Bearer ", "");

return verificarToken(token);


} catch {
return null;
}
}

export function estaAutenticado(req) {
return !!obterUsuario(req);
}

export function temPermissao(
req,
...funcoesPermitidas
) {
const usuario =
obterUsuario(req);

if (!usuario) {
return false;
}

return funcoesPermitidas.includes(
usuario.funcao
);
}
