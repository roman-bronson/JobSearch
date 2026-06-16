import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../generated/prisma/client";
import "dotenv/config"

const url = new URL(process.env.DATABASE_URL!);

const adapter = new PrismaMariaDb({
    host: url.hostname,
    port: url.port ? parseInt(url.port) : 3306,
    database: url.pathname.substring(1),
    user: url.username,
    password: url.password,
});

const prisma = new PrismaClient({ adapter });

export default prisma;