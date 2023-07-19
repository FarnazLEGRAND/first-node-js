// je ramen Person entities- auto complet ba cheragh mi ayad
import { Person } from "../entities";
import { connection } from "./connection";

// person entre () : vien de mon data base 
// collection dans le mango db c'est le table en mySQL
const collection=connection.db('first').collection<Person>('person')
export const personRepository={
     findAll() {
    return collection.find().toArray();
    },
    
    findById(_id){

    }

};
