import { MongoClient } from "mongodb";
// connection a la base de donnees mongodb 
export const connection = new MongoClient(process.env.DATABASE_URL!);
