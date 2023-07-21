import { MongoClient } from "mongodb";
// connection a la base de donnees mongodb 
export const connection = new MongoClient(process.env.DATABASE_URL!);


// pour mango db ai besoin de clean up pour netoyer le ram.
const cleanup = () => {
    connection.close();
    process.exit();
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);