import { PrismaClient } from "@prisma/client";

declare global {
    var prisma : PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()
if(process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client;


// ata use korci jate kore next 13 hot reload na ney. ata best practice for next13