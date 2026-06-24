import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../generated/prisma/client";
import "dotenv/config";

// Load database connection information from the DATABASE_URL
// environment variable and parse it into individual components
// required by the MariaDB adapter.
const url = new URL(process.env.DATABASE_URL!);

// Prisma 7 uses adapters to communicate with the database.
// The MariaDB adapter expects connection details separately,
// so we extract them from the DATABASE_URL.
const adapter = new PrismaMariaDb({
    host: url.hostname,
    port: url.port ? parseInt(url.port) : 3306,
    database: url.pathname.substring(1),
    user: url.username,
    password: url.password,
});

// Create a single Prisma client instance that will be reused
// throughout the application for all database operations.
const prisma = new PrismaClient({ adapter });

export default prisma;