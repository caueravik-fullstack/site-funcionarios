// Responsável pela conexão com postgres
import pkg from "pg";

const { Pool } = pkg;

// Dados da conexão com o PostgreSQL
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "sistema-funcionarios",
    password: "postgres",
    port: 5432
});

export default pool;